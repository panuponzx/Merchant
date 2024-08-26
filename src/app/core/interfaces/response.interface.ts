import { WalletSummaryModel, AddressModel, CustomerModel, ObuInfoModel, CarInfoModel, TransactionModel, TopupModel, ZipcodeModel, ITransferModel, IFaremediaModel, CustomerContact } from "./data.interface"

export interface IResponseModel<T> {
  data: T
  errorCode: string
  errorMessage: string
  throwableMessage: string
}

export interface IProvinceModel {
  id: number
  code: string
  name: string
  nameEn: string
}

export interface IDistrictModel {
  id: number
  code: string
  name: string
  nameEn: string
  provinceId: number
}

export interface ISubDistrictModel {
  id: number
  code: string
  name: string
  nameEn: string
  districtId: number
  provinceId: number
}

export interface IZipcodeModel {
  id: number
  code: string
  districtId: number
  provinceId: number
  subdistrictCode: string
}

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

export interface IBeginResponse {
  txnId: string
  exp: string
}
export interface IConsentResponse {
  consentId: string
  seq: number
  code: string
  version: number
  title: string
  isRequired: boolean
  content: string
  contentShort: string
  contentType: string
  lang: string
}

export interface IOtpEmailResponse {
  ref: string
  sysReference: string
  sendTo: string
  timeoutInSec: number
  exp: string
}

export interface IDocumentTypeResponse {
  key: string
  name: string
  nameEN: string
}

export interface IJuristicDocumentResponse {
  fileName: string
  docName: string
  docType: string
  docTypeCode: string
  reference: string
  createdDate: string
}