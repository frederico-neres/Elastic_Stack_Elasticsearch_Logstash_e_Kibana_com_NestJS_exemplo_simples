export function getAddressExternalClientUrl(zipCode: string) {
    return `https://viacep.com.br/ws/${zipCode}/json/`;
}