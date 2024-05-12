import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonCreate } from './person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getPersons() {
        return this.http.get<Person[]>("http://localhost:8080/persons");
    }

    getPersonByCpf(cpf: string) {
        return this.http.get<Person>(`http://localhost:8080/persons/search/${cpf}`);
    }

    savePerson(personDto: PersonCreate) {
        return this.http.post<Person>("http://localhost:8080/persons", personDto);
    }

    existsByCpf(cpf: string) {
        return this.http.get<boolean>(`http://localhost:8080/persons/exists-by-cpf?cpf=${cpf}`);
    }
}