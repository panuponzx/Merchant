import { WalletSummaryModel, AddressModel, CustomerModel, ObuInfoModel, CarInfoModel, TransactionModel, TopupModel, ZipcodeModel, ITransferModel, IFaremediaModel, CustomerContact } from "./data.interface"

export interface ResponseMessageModel {
  token: any
  errorCode: string,
  errorMessage: string,
  requestParam: {
    channelId: number,
    reqId: string
  }
}

export interface ResponseModel<T> extends ResponseMessageModel {
  data: T,
  throwableMessage: string
}

// export interface ResponseSearchCutomerModel extends ResponseMessageModel {
//   data: IPaginationModel<Array<ICustomerSearchModel>>
// }

export interface ReponseWalletSummaryModel extends ResponseMessageModel {
  lstSummary: WalletSummaryModel[]
}

export interface ReponseCustomerModel extends ResponseMessageModel {
  addresses: AddressModel[],
  customer: CustomerModel,
  customerContact: CustomerContact
}

export interface ReponseCustomerObuModel extends ResponseMessageModel {
  obus: [ObuInfoModel, CarInfoModel][]
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

export interface ResponsePassageInformationModel extends ReponseCustomerModel {
  // totalTransactions: number,
  // transactions: PassageInformationModel[]
  totalData: number,
  data: any[]
}

export interface IResponseTransferModel extends ResponseMessageModel {
  data: ITransferModel[]
  // data: any[]
  errorCode: string
  errorMessage: string
  throwableMessage: string
  totalData: number
}

export interface IResponseFaremediaModel extends ResponseMessageModel {
  data: IFaremediaModel[]
}

export interface ICarModal extends ResponseMessageModel {
  id: number
  brand: string
}
export interface IResponseCarModal extends ResponseMessageModel {
  data: ICarModal[]
}

export interface IProvinceModal extends ResponseMessageModel {
  provinceId: number
  provinceName: string
  provinceNameEn: string
}
export interface IResponseProvinceModal extends ResponseMessageModel {
  data: IProvinceModal[]
}

export interface IResponseTransactionSuspensionModal extends ResponseMessageModel {
  data: ITransactionSuspensionDataModal
}

export interface ITransactionSuspensionDataModal {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ITransactionSuspensionElementModal[]
}

export interface ITransactionSuspensionElementModal {
  customerId: string
  date: string
  name: string
  status: number
  statusName: string
  empName: string
  isBlacklist: boolean
  customerType: number
}
