import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { catchError, of } from 'rxjs';
import { Person } from '../../beans/person/person';
import { PersonService } from '../../beans/person/person.service';
import { formatCpf, isCpf } from '../../utils/brazil.utils';
import { debounced } from '../../utils/reactivity.utils';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [NzTableModule, NzInputModule, NzFormModule, NzIconModule, NzAvatarModule, NzButtonModule, NzFlexModule, RouterLink],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css'
})
export class PersonListComponent {

    persons = signal<Person[]>([])

    filterValue = signal("")
    debouncedFilterValue = debounced(this.filterValue, 500)

    constructor(private personService: PersonService, private message: NzMessageService) {
        effect(() => {
            this.search(this.debouncedFilterValue())
        })
    }

    private search(query: string) {
        if (!query) {
            this.fetchAllPersons()
            return;
        }

        if (isCpf(query)) {
            this.searchByCpf(query)

            return;
        }

        const name = query;
        this.searchByName(name)
    }

    private searchByCpf(query: string) {
        const cpf = query.replaceAll(".", "").replace("-", "")

        this.personService.searchPersonByCpf(cpf)
            .pipe(
                catchError((error) => {
                    if (error.status !== 404) {
                        this.message.error("Ocorreu algum erro ao buscar uma pessoa pelo CPF!")
                    }

                    return of(null);
                })
            )
            .subscribe((o) => {
                const persons = !o ? [] : [o]

                this.persons.set(persons)
            })
    }

    private searchByName(name: string) {
        this.personService.searchPersonByName(name)
            .pipe(
                catchError((error) => {
                    if (error.status !== 404) {
                        this.message.error("Ocorreu algum erro ao filtrar as pessoas pelo nome!")
                    }

                    return of(null);
                })
            )
            .subscribe((o) => {
                const persons = !o ? [] : o

                this.persons.set(persons)
            })
    }

    private fetchAllPersons() {
        this.personService.getPersons()
            .pipe(catchError(() => {
                this.message.error("Ocorreu algum erro buscar os cadastros!")

                return of(null);
            }))
            .subscribe((o) => {
                this.persons.set(o || [])
            })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filterValue.set(filterValue)
    }

    formatCpf = formatCpf
}
