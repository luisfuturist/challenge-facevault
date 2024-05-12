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

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [NzTableModule, NzDividerModule, NzInputModule, NzFormModule, NzIconModule, NzAvatarModule],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {

    filterValue = signal("")

    persons = signal<Person[]>([])
    dataSet = computed(() => {
        return this.persons()?.filter((person) => {
            const includesName = person.name.toLowerCase()
                .includes(this.filterValue().toLowerCase())

            return includesName;
        }) || []
    })

    constructor(private personService: PersonService) { }

    ngOnInit() {
        this.personService.getPersons().subscribe((o) => {
            this.persons.set(o || [])
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filterValue.set(filterValue)
    }

    formatCpf(cpf: String) {
        const formattedCpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;

        return formattedCpf;
    }
}
