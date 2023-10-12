import { Address } from "src/domain/Address";
import { IAddressExternalClient } from "src/port/IAddressExternalClient";
import { ICheckStateAllowedForSalesUsecase } from "src/port/ICheckStateAllowedForSalesUsecase";
import { Logger } from "winston";

export class CheckStateAllowedForSalesUsecase implements ICheckStateAllowedForSalesUsecase {
    
    constructor(
        private iAddressExternalClient :IAddressExternalClient,
        private logger: Logger
    ) {}

    async check(zipCode: string): Promise<boolean> {
        this.logger.info("[CheckStateAllowedForSalesUsecase] starting checking the state allowed for sales");
        let address: Address = await this.iAddressExternalClient.getByZipCode(zipCode);
        let isAllowed: boolean = address.checkPermittedState();
        this.logger.info("[CheckStateAllowedForSalesUsecase] completed checking the state allowed for sales");
        return isAllowed;
    }

}