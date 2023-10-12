export interface ICheckStateAllowedForSalesUsecase {
    check(zipCode: string): Promise<boolean>
}