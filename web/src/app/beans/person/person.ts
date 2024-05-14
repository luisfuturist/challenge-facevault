export interface Person {
    id: number;
    name: string;
    maskedCpf: string;
    photoId: number;
}

export interface PersonCreate {
    name: string;
    cpf: string;
    photoId: number;
}

export interface PersonUpdate {
    id: number;
    name: string;
    cpf: string;
    photoId: number;
}
