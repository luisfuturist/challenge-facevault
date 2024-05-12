export function formatCpf(cpf: String) {
    const formattedCpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;

    return formattedCpf;
}

export function isCpf(text: string): boolean {
    const cleanedText = text.replace(/\D/g, '');

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const isValidCpf = cleanedText.length === 11 || cpfRegex.test(cleanedText);

    return isValidCpf;
}