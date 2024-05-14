import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class PersonPhotoService {

    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    deletePersonPhoto(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/person-photos/${id}`);
    }
}