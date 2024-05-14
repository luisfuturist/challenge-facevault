import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { PersonService } from '../../../beans/person/person.service';
import { Person } from '../../../beans/person/person';
import { catchError, of } from 'rxjs';
import { formatCpf } from '../../../utils/brazil.utils';
import { getPhotoUrl } from '../../../utils/image.utils';

@Component({
    selector: 'app-person-details',
    standalone: true,
    imports: [
        NzButtonModule,
        NzMessageModule,
        RouterLink,
        NzIconModule,
        NzCardModule,
        NzAvatarModule,
        NzSpaceModule,
        NzFlexModule,
        NzPopconfirmModule,
        NzSkeletonModule,
        NzTypographyModule
    ],
    templateUrl: './person-details.component.html',
    styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {

    route = inject(ActivatedRoute)
    router = inject(Router)
    message = inject(NzMessageService)
    personService = inject(PersonService)

    data = signal<Person | undefined>(undefined);
    loading = signal(true);
    error = signal(false);
    personId = computed(() => this.data()?.id)

    deletePerson() {
        const person = this.data();

        if (!person) {
            return;
        }

        this.personService.deletePerson(person.id).pipe(catchError(() => {
            this.message.error("Ocorreu algum erro ao tentar apagar a pessoa!")

            return of(null);
        }))
            .pipe(catchError(() => {
                this.message.error("Ocorreu algum erro ao tentar apagar a pessoa!")

                return of(null);
            }))
            .subscribe(() => {
                this.message.success("Pessoa apagada com sucesso!")
                this.router.navigateByUrl("/", { replaceUrl: true });
            })
    }

    formatCpf = formatCpf
    getPhotoUrl = getPhotoUrl

    private async loadPerson() {
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
                })
        });
    }

    ngOnInit() {
        this.loadPerson()
    }
}
