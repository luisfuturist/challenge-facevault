import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PersonService } from '../../beans/person/person.service';
import { Person } from '../../beans/person/person';
import { formatCpf, isCpf } from '../../utils/brazil.utils';
import { debounced } from '../../utils/reactivity.utils';
import { catchError, of, retry } from 'rxjs';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [NzTableModule, NzDividerModule, NzInputModule, NzFormModule, NzIconModule, NzAvatarModule],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {

    filterValue = signal("")
    debouncedFilterValue = debounced(this.filterValue, 500)

    persons = signal<Person[]>([])
    dataSet = computed(() => {
        return this.persons()?.filter((person) => {
            const includesName = person.name.toLowerCase()
                .includes(this.filterValue().toLowerCase())
            const includesCpf = isCpf(this.filterValue());

            return includesName || includesCpf;
        }) || []
    })

    constructor(private personService: PersonService) {
        effect(() => {
            this.search(this.debouncedFilterValue())
        })
    }

    search(query: string) {
        if (!query) {
            return;
        }

        if (isCpf(query)) {
            const cpf = query;

            this.personService.getPersonByCpf(cpf)
                .pipe(
                    catchError((error) => {
                        if(error.status !== 404) {
                            console.error('Error fetching profile:', error);
                        }
                        
                        return of(null);
                    })
                )
                .subscribe((o) => {
                    const persons = !o ? [] : [o]

                    this.persons.set(persons)
                })
        }
    }

    ngOnInit() {
        this.personService.getPersons().subscribe((o) => {
            this.persons.set(o || [])
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filterValue.set(filterValue)
    }

    formatCpf = formatCpf
}
