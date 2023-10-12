import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ICheckStateAllowedForSalesUsecase } from 'src/port/ICheckStateAllowedForSalesUsecase';
import { Logger } from 'winston';

@Controller("/address")
export class AddressController {
  constructor(
    @Inject("ICheckStateAllowedForSalesUsecase") 
    private readonly iCheckStateAllowedForSalesUsecase: ICheckStateAllowedForSalesUsecase,
    @Inject("logger") 
    private readonly logger: Logger,
  ) {}

  @Get("/zip-code/:zipcode/allowed")
  async checkStateAllowedForSales(@Param("zipcode") zipcode: string): Promise<boolean> {
    this.logger.info("[checkStateAllowedForSales] starting controller");
    let isAllowed: boolean = await this.iCheckStateAllowedForSalesUsecase.check(zipcode);
    this.logger.info("[checkStateAllowedForSales] finishing controller");
    return isAllowed;
  }
}