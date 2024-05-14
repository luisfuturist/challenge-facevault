import { HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignalInputDirective, V, createFormField, createFormGroup } from 'ng-signal-forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer, catchError, of } from 'rxjs';
import { PersonPhoto } from '../../../beans/person-photo/person-photo';
import { PersonPhotoService } from '../../../beans/person-photo/person-photo.service';
import { PersonCreate } from '../../../beans/person/person';
import { PersonService } from '../../../beans/person/person.service';
import { CPF_PATTERN } from '../../../utils/brazil.utils';
import { convertToDto, createFormValidation } from '../../../utils/form.utils';
import { getBase64, getPhotoUploadAction } from '../../../utils/image.utils';

@Component({
    selector: 'app-person-add',
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
        NzUploadModule,
    ],
    templateUrl: './person-add.component.html',
    styleUrl: './person-add.component.css'
})
export class PersonAddComponent {

    router = inject(Router)
    message = inject(NzMessageService)
    personService = inject(PersonService)
    photoService = inject(PersonPhotoService)

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
        cpf: createFormField('', {
            validators: [
                V.required(),
                {
                    validator: V.pattern(CPF_PATTERN),
                    message: () => `Deve seguir o formato xxx.xxx.xxx-xx.`,
                },
            ],
        }),
    });

    formValidation = createFormValidation(this.formModel)

    photoUrl = signal<string | null>(null)
    photoId = signal<number | null>(null);
    photoUploadLoading = signal<boolean>(false)

    submitForm() {
        if (!this.photoId()) {
            this.message.error("É necessário fazer upload da foto.")
            return;
        }

        this.formModel.markAllAsTouched();

        if (!this.formModel.valid()) {
            return;
        }

        this.savePerson()
    }

    cancel(e: Event) {
        e.preventDefault()

        const photoIdToDelete = this.photoId();

        if (photoIdToDelete != undefined && photoIdToDelete != null) {
            this.photoService.deletePersonPhoto(photoIdToDelete)
                .pipe(catchError(() => {
                    this.message.error("Ocorreu algum erro ao tentar apagar a foto!")

                    return of(null);
                })).subscribe(() => { })
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

    private savePerson() {
        const personDto = convertToDto<PersonCreate>(this.formModel);

        const personCreateDto: PersonCreate = {
            ...personDto,
            cpf: personDto.cpf.replaceAll(".", "").replace("-", ""),
            photoId: this.photoId()!
        }

        return this.personService.existsByCpf(personCreateDto.cpf)
            .pipe(catchError(() => {
                this.message.error("Ocorreu algum erro ao tentar cadastrar!")

                return of(null);
            }))
            .subscribe((o) => {
                if (o) {
                    this.message.error("CPF já cadastrado!")
                    return;
                }

                this.personService.savePerson(personCreateDto)
                    .pipe(catchError(() => {
                        this.message.error("Ocorreu algum erro ao tentar cadastrar!")

                        return of(null);
                    }))
                    .subscribe(person => {
                        if (!person) {
                            return;
                        }

                        this.message.success("Pessoa cadastrada com sucesso!")
                        this.formModel.reset();
                        this.photoId.set(null);
                        this.photoUrl.set(null);
                    })
            })
    }
}
