import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignalInputDirective, V, createFormField, createFormGroup } from 'ng-signal-forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer, catchError, of } from 'rxjs';
import { PersonPhoto } from '../../../beans/person-photo/person-photo';
import { PersonPhotoService } from '../../../beans/person-photo/person-photo.service';
import { Person, PersonUpdate } from '../../../beans/person/person';
import { PersonService } from '../../../beans/person/person.service';
import { formatCpf } from '../../../utils/brazil.utils';
import { convertToDto, createFormValidation } from '../../../utils/form.utils';
import { getBase64, getPhotoUploadAction, getPhotoUrl } from '../../../utils/image.utils';

@Component({
    selector: 'app-person-edit',
    standalone: true,
    imports: [
        FormsModule,
        SignalInputDirective,
        HttpClientModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMessageModule,
        RouterLink,
        NzFlexModule,
        NzSpaceModule,
        NzIconModule,
        NzTypographyModule,
        NzPopconfirmModule,
        NzUploadModule,
    ],
    templateUrl: './person-edit.component.html',
    styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {

    route = inject(ActivatedRoute)
    router = inject(Router)
    message = inject(NzMessageService)
    personService = inject(PersonService)
    photoService = inject(PersonPhotoService)

    data = signal<Person | null>(null)
    loading = signal(true)
    error = signal(false)

    formModel = createFormGroup({
        name: createFormField('', {
            validators: [
                V.required(),
                {
                    validator: V.maxLength(100),
                    message: ({ maxLength }) => `O nome deve ter no máximo ${maxLength} caracteres.`,
                },
            ],
        }),
        cpf: createFormField(''),
    });

    photoUrl = signal<string | null>(null)
    photoId = signal<number | null>(null);
    photoUploadLoading = signal<boolean>(false)

    formValidation = createFormValidation(this.formModel)

    submitForm() {
        if (!this.photoId()) {
            this.message.error("É necessário fazer upload da foto.")
            return;
        }

        this.formModel.markAllAsTouched();

        if (!this.formModel.valid()) {
            return;
        }

        this.updatePerson()
    }

    cancel(e: Event) {
        e.preventDefault()

        const photoIdToDelete = this.photoId();

        if (photoIdToDelete != undefined && photoIdToDelete != null) {
            this.photoService.deletePersonPhoto(photoIdToDelete)
                .pipe(catchError(() => {
                    this.message.error("Ocorreu algum erro ao tentar apagar a foto!")

                    return of(null);
                })).subscribe(() => {
                    console.log('removed', photoIdToDelete)
                })
        }

        this.router.navigate(["/"])
    }

    onBeforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
        new Observable((o: Observer<boolean>) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

            if (!isJpgOrPng) {
                this.message.error('Você só pode enviar PNG ou JPG.');
                o.complete();
                return;
            }

            const isLt2M = file.size! / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.message.error('Imagem não pode ser maior que 2MB.');
                o.complete();
                return;
            }

            o.next(isJpgOrPng && isLt2M);
            o.complete();
        });

    onUpload(info: { file: NzUploadFile }) {
        switch (info.file.status) {
            case 'uploading':
                this.photoUploadLoading.set(true);
                break;
            case 'done':
                const photo: PersonPhoto = info.file.response;
                this.photoId.set(photo.id);

                getBase64(info.file!.originFileObj!, (img: string) => {
                    this.photoUploadLoading.set(false);
                    this.photoUrl.set(img);
                });
                break;
            case 'error':
                this.message.error('Ocorreu algum erro ao fazer upload da imagem.');
                this.photoUploadLoading.set(false);
                break;
        }
    }

    getPhotoUploadAction = getPhotoUploadAction

    private loadPerson() {
        this.route.paramMap.subscribe((params) => {
            const param = params.get('id')!;

            if (!Number.isInteger(Number(param))) {
                this.message.error("Parametro ID da rota deve ser um inteiro.")
                this.router.navigateByUrl("/person-not-found", { replaceUrl: true });
                return;
            }

            const id = Number(param);

            this.loading.set(true);

            this.personService.getPersonById(id).pipe(catchError((error) => {
                if (error.status === 404) {
                    this.router.navigateByUrl("/person-not-found", { replaceUrl: true });
                    return of(null);
                }

                this.message.error("Ocorreu algum erro ao tentar buscar a pessoa!")
                this.error.set(true);

                return of(null);
            }))
                .subscribe((o) => {
                    this.loading.set(false);

                    if (!o) {
                        return;
                    }

                    this.data.set(o)
                    this.error.set(false)

                    this.setFormData(this.data()!)

                    this.photoUrl.set(getPhotoUrl(this.data()!)!)
                    this.photoId.set(this.data()!.photoId)
                })
        });
    }

    private setFormData(person: Person) {
        const c = this.formModel.controls;

        c.name.value.set(person.name)
        c.cpf.value.set(formatCpf(person.maskedCpf)!)
    }

    private updatePerson() {
        const personDto = convertToDto<PersonUpdate>(this.formModel);

        const personUpdateDto: PersonUpdate = {
            ...personDto,
            id: this.data()!.id,
            cpf: personDto.cpf.replaceAll(".", "").replace("-", ""),
            photoId: this.photoId()!,
        }

        return this.personService.updatePerson(personUpdateDto)
            .pipe(catchError(() => {
                this.message.error("Ocorreu algum erro ao tentar atualizar os dados!")

                return of(null);
            }))
            .subscribe(person => {
                if (!person) {
                    return;
                }

                this.message.success("Pessoa atualizada com sucesso!")
            })

    }

    ngOnInit() {
        this.loadPerson()
    }
}
