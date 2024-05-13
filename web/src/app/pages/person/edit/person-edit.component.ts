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
import { catchError, of } from 'rxjs';
import { Person, PersonUpdate } from '../../../beans/person/person';
import { PersonService } from '../../../beans/person/person.service';
import { formatCpf } from '../../../utils/brazil.utils';
import { convertToDto, createFormValidation } from '../../../utils/form.utils';
import { URL_PATTERN } from '../../../utils/web.utils';

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
    ],
    templateUrl: './person-edit.component.html',
    styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {

    route = inject(ActivatedRoute)
    router = inject(Router)
    message = inject(NzMessageService)
    personService = inject(PersonService)

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
        photoUrl: createFormField('', {
            validators: [
                V.required(),
                {
                    validator: V.minLength(1),
                    message: () => `A URL da imagem é obrigatória.`,
                },
                {
                    validator: V.pattern(URL_PATTERN),
                    message: () => `Deve ser uma URL válida.`,
                },
            ],
        }),
    });

    formValidation = createFormValidation(this.formModel)

    submitForm() {
        this.formModel.markAllAsTouched();

        if (!this.formModel.valid()) {
            return;
        }

        this.updatePerson()
    }

    cancel(e: Event) {
        e.preventDefault()
        this.router.navigate(["/"])
    }

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
                })
        });
    }

    private setFormData(person: Person) {
        const c = this.formModel.controls;

        c.name.value.set(person.name)
        c.cpf.value.set(formatCpf(person.maskedCpf))
        c.photoUrl.value.set(person.photoUrl)
    }

    private updatePerson() {
        const personDto = convertToDto<PersonUpdate>(this.formModel);

        const personUpdateDto: PersonUpdate = {
            ...personDto,
            id: this.data()!.id,
            cpf: personDto.cpf.replaceAll(".", "").replace("-", "")
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
