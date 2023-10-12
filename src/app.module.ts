import { Module } from '@nestjs/common';
import { AddressController } from './infrastructure/rest-controller/AddressController';
import { ICheckStateAllowedForSalesUsecase } from './port/ICheckStateAllowedForSalesUsecase';
import { CheckStateAllowedForSalesUsecase } from './usecase/CheckStateAllowedForSalesUsecase';
import { IAddressExternalClient } from './port/IAddressExternalClient';
import { AddressExternalClient } from './infrastructure/external-client/AddressExternalClient';
import { initLogger } from './configuration/logger';
import { Logger } from 'winston';


let logger: Logger = initLogger();
let addressExternalClient :IAddressExternalClient = new AddressExternalClient(logger);
let usecase: ICheckStateAllowedForSalesUsecase = new CheckStateAllowedForSalesUsecase(addressExternalClient, logger);

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [
    {provide: "ICheckStateAllowedForSalesUsecase", useValue: usecase},
    {provide: "logger", useValue: logger}
  ],
})
export class AppModule {}
