import { Person } from "../beans/person/person";

export function getPhotoUrl(person: Person) {
    if (!person?.photoId) {
        return undefined;
    }

    const apiUrl = 'http://localhost:8080'
    return new URL('/person-photos/' + person.photoId, apiUrl).toString()
}

export function getPhotoUploadAction() {
    const apiUrl = 'http://localhost:8080'
    return new URL('/person-photos', apiUrl).toString()
}

export function getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
}
