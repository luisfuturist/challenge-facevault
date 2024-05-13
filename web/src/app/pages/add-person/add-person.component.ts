import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalInputDirective, V, createFormField, createFormGroup } from 'ng-signal-forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
import { PersonCreate } from '../../beans/person/person';
import { PersonService } from '../../beans/person/person.service';
import { CPF_PATTERN } from '../../utils/brazil.utils';
import { convertToDto, createFormValidation } from '../../utils/form.utils';
import { URL_PATTERN } from '../../utils/web.utils';
import { Router, RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
    selector: 'app-add-person',
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
        NzIconModule
    ],
    templateUrl: './add-person.component.html',
    styleUrl: './add-person.component.css'
})
export class AddPersonComponent {

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

    constructor(private personService: PersonService, private message: NzMessageService, private router: Router) { }

    submitForm() {
        this.formModel.markAllAsTouched();

        if (!this.formModel.valid()) {
            return;
        }

        this.savePerson()
    }

    cancel(e: Event) {
        e.preventDefault()
        this.router.navigate(["/"])
    }

    private savePerson() {
        const personDto = convertToDto<PersonCreate>(this.formModel);

        const personCreateDto: PersonCreate = {
            ...personDto,
            cpf: personDto.cpf.replaceAll(".", "").replace("-", "")
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
                    })
            })
    }
}
