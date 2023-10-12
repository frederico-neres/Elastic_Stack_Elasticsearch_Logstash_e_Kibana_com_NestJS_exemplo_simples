import { Address } from "src/domain/Address";

export interface IAddressExternalClient {
    getByZipCode(zipCode: string): Promise<Address>
}
