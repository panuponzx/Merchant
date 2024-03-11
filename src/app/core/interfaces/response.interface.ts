import { AddressModel, CarInfoModel, CustomerModel, ObuInfoModel, TopupModel, TransactionModel, WalletSummaryModel, ZipcodeModel } from "./data.interface";

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

export interface ResponseHistoryModel extends ReponseCustomerModel {
  totalTransactions: number,
  transactions: TransactionModel[]
}

export interface ReponseSearchCustomerModel extends ResponseMessageModel {
  customers: CustomerModel[]
}

export interface ReponseTopupModel extends ResponseMessageModel {
  totalTransactions: number,
  transactions: TopupModel[]
}

export interface ReponseZipcodeModel extends ResponseMessageModel {
  zipCodes: ZipcodeModel[],
}
