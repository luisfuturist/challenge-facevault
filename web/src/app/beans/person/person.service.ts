import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonCreate, PersonUpdate } from './person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getPersons() {
        return this.http.get<Person[]>("http://localhost:8080/persons");
    }

    getPersonById(id: number) {
        return this.http.get<Person>(`http://localhost:8080/persons/${id}`);
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

    updatePerson(personDto: PersonUpdate) {
        return this.http.put<Person>(`http://localhost:8080/persons/${personDto.id}`, personDto);
    }

    deletePerson(personId: number) {
        return this.http.delete<Person>(`http://localhost:8080/persons/${personId}`);
    }

    existsByCpf(cpf: string) {
        return this.http.get<boolean>(`http://localhost:8080/persons/exists-by-cpf?cpf=${cpf}`);
    }
}