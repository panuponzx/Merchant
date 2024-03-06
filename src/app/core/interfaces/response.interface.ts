import { AddressModel, CarInfoModel, CustomerModel, ObuInfoModel, WalletSummaryModel } from "./data.interface";

export interface ResponseMessageModel {
  errorCode: string,
  errorMessage: string,
  requestParam: {
    channelId: number,
    reqId: string
  }
}

export interface ReponseWalletSummaryModel extends ResponseMessageModel {
  lstSummary: WalletSummaryModel[]
}

export interface ReponseCustomerModel extends ResponseMessageModel {
  addresses: AddressModel[],
  customer: CustomerModel
}

export interface ReponseCustomerObuModel extends ResponseMessageModel {
  obus: [ ObuInfoModel, CarInfoModel ][]
}
