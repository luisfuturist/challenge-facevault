export interface Person {
    id: number;
    name: string;
    maskedCpf: string;
    photoUrl: string;
}

export interface PersonCreate {
    name: string;
    cpf: string;
    photoUrl: string;
}

export interface PersonUpdate {
    id: number;
    name: string;
    cpf: string;
    photoUrl: string;
}
