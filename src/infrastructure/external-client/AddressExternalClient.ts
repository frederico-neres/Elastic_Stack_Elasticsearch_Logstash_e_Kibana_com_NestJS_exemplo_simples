import { Address } from "src/domain/Address";
import { IAddressExternalClient } from "src/port/IAddressExternalClient";
import axios from 'axios';
import { Logger } from "winston";
import { getAddressExternalClientUrl } from "src/configuration/config-properties";


class AddressResponse{
    constructor(
        private cep: string,
        private bairro: string,
        private localidade: string,
        private uf: string
    ) {}

    toDomain(logger: Logger): Address {
        return new Address(
            this.cep,
            this.bairro,
            this.localidade,
            this.uf,
            logger
        );
    }
}

export class AddressExternalClient implements IAddressExternalClient {

    constructor(
        private logger: Logger
    ) {}

    async getByZipCode(zipCode: string): Promise<Address> {
        
        let url = getAddressExternalClientUrl(zipCode);
        let addr: AddressResponse;

        this.logger.info("Initiate a call to an external customer to search for an address by zip code");
        await axios.get(url)
        .then(function (response) {
            let data = response['data'];
            addr = new AddressResponse(
                data["cep"],
                data["bairro"],
                data["localidade"],
                data["uf"]
            );
        })
        .catch(function (error) {
            throw new Error("zip code not found");
        })
        
        this.logger.info("Ended call to external customer to search for address by zip code");
        return addr.toDomain(this.logger);
    }
}
