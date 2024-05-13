import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonCreate } from './person';
import { isCpf } from '../../utils/brazil.utils';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getPersons() {
        return this.http.get<Person[]>("http://localhost:8080/persons");
    }

    searchPersonByCpf(cpf: string) {
        return this.http.get<Person>(`http://localhost:8080/persons/search-by-cpf/${cpf}`)
    }

    searchPersonByName(name: string) {
        return this.http.get<Person[]>(`http://localhost:8080/persons/search-by-name/${name}`)
    }

    savePerson(personDto: PersonCreate) {
        return this.http.post<Person>("http://localhost:8080/persons", personDto);
    }

    existsByCpf(cpf: string) {
        return this.http.get<boolean>(`http://localhost:8080/persons/exists-by-cpf?cpf=${cpf}`);
    }
}