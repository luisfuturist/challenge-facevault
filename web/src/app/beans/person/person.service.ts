import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Person, PersonCreate, PersonUpdate } from './person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPersons() {
        return this.http.get<Person[]>(`${this.baseUrl}/persons`);
    }

    getPersonById(id: number) {
        return this.http.get<Person>(`${this.baseUrl}/persons/${id}`);
    }

    searchPersonByCpf(cpf: string) {
        return this.http.get<Person>(`${this.baseUrl}/persons/search-by-cpf/${cpf}`)
    }

    searchPersonByName(name: string) {
        return this.http.get<Person[]>(`${this.baseUrl}/persons/search-by-name/${name}`)
    }

    savePerson(personDto: PersonCreate) {
        return this.http.post<Person>(`${this.baseUrl}/persons`, personDto);
    }

    updatePerson(personDto: PersonUpdate) {
        return this.http.put<Person>(`${this.baseUrl}/persons/${personDto.id}`, personDto);
    }

    deletePerson(personId: number) {
        return this.http.delete<Person>(`${this.baseUrl}/persons/${personId}`);
    }

    existsByCpf(cpf: string) {
        return this.http.get<boolean>(`${this.baseUrl}/persons/exists-by-cpf?cpf=${cpf}`);
    }
}