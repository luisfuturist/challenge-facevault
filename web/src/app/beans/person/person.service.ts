import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';

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
}