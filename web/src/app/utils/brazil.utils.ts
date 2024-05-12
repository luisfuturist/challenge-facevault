export const CPF_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const CPF_CLEANED_PATTERN = /^\d{11}$/;

export function formatCpf(cpf: String) {
    const formattedCpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;

    return formattedCpf;
}

export function isCpf(text: string): boolean {
    return CPF_CLEANED_PATTERN.test(text) || CPF_PATTERN.test(text);
}
