import { Logger } from "winston";

const STATES_ALLOWED_FOR_SALE: Array<string> = ['SP', 'MG', 'SC']

export class Address {
    constructor(
        private cep: string,
        private bairro: string,
        private localidade: string,
        private uf: string,
        private logger: Logger
    ) {}

    checkPermittedState(): boolean {
        if(STATES_ALLOWED_FOR_SALE.includes(this.uf)) {
            this.logger.info(`state ${this.uf} is allowed for sales, 
            cep: ${this.cep}, bairro: ${this.bairro}, localidade: ${this.localidade}`);
            return true;
        };

        this.logger.info(`state ${this.uf} is not allowed for sales,
         cep: ${this.cep}, bairro: ${this.bairro}, localidade: ${this.localidade}`)
        return false; 
    }

}