import { WalletSummaryModel, AddressModel, CustomerModel, ObuInfoModel, CarInfoModel, TransactionModel, TopupModel, ZipcodeModel, ITransferModel, IFaremediaModel, CustomerContact, IJuristicElementModel, IProvinceMasterData, ICarMasterData } from "./data.interface"

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

export interface IJuristicDopaResponse {
  isValid: boolean
}

export interface IJuristicInquiryResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: IJuristicElementModel[]
}
export interface ITestFaremediaInfoResponseModel extends ResponseMessageModel {
  data: ITestFaremediaInfoModel
}
export interface ITestFaremediaInfoModel {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ITestFaremediaInfoModel[]
}
export interface ITestFaremediaInfoModel {
  faremediaValue: string,
  status: boolean,
  isReserved: boolean,
  update_date: string,
  create_date: string,
}
export interface IReponseRegisterTestFaremediaModel extends ResponseMessageModel {
  data: ITestFaremediaRegisterModel
}
export interface ITestFaremediaRegisterModel {
  faremediaValue: string,
  status: boolean,
  isReserved: boolean,
}
export interface IReturnTestFaremediaResponseModel extends ResponseMessageModel {
  data: IReturnTestFaremediaModel
}
export interface IReturnTestFaremediaModel {
  id: string,
  faremediaValue: string,
  name: string,
  institute: string,
  remark: string
}
export interface ITestFaremediaInfoListResponseModel extends ResponseMessageModel {
  data: ITestFaremediaInfoListModel
}
export interface ITestFaremediaInfoListModel {
  id: string,
  faremediaValue: string,
  name: string,
  institute: string,
  expectedReturnDate: string,
  returnDate: string,
  createdDate: string,
  updatedDate: string,
  remark: string
}
export interface ISearchTestFaremediaInfoResponseModel extends ResponseMessageModel {
  data: ISearchTestFaremediaInfoModel
}
export interface ISearchTestFaremediaInfoModel {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ISearcnTestFaremediaWithWalletIdModel[]
}
export interface ISearcnTestFaremediaWithWalletIdModel {
  walletId: string
  faremediaValue: string
  status: boolean
  isReserved: boolean
  create_date: string
}

export interface ISearcnCustomerResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ISearcnElementCustomerModel[]
}

export interface ISearcnElementCustomerModel {
  id: string
  identification: string
  name: string
  mobilePhone: string
  branchCode: any
  branchName: any
}
export interface IFaremediaReturnedResponse {
  balance: number
  carPlate: string
  carPlateProvince: string
  createDate: string
  displayBalance: string
  displayCreateDateTime: string
  displayFaremediaCreateDate: string
  faremediaCreateDate: string
  newObu: string
  newSmartCard: string
  oldObu: string
  oldSmartCard: string
}

export interface IMasterDataInstitutionType9Model {
  id: string
  name: string
}
export interface IResponseMasterDataInstitutionType9Model extends ResponseMessageModel {
  data: IMasterDataInstitutionType9Model[]
}

export interface ICustomerType9Model {
  id: string
  name: string
  isActive: boolean
  create_date: string
  remark: string
}
export interface ICustomerTableType9Model {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ICustomerType9Model[]
}
export interface IResponseCustomerType9Model extends ResponseMessageModel {
  data: ICustomerTableType9Model
}

export interface IWalletWithFaremediaModel {
  customerId: string,
  walletId: string,
  walletName: string,
  faremediaValue: string,
  plateNo: string,
  carModel: string,
  carSubModel: string,
  carColor: string,
  cardNo: string,
  plateProvince: string,
  carYear: string,
  faremediaStatus: string,
}
export interface ICustomerWithWalletModel {
  customerType9: ICustomerType9Model
  pagination: IWalletWithFaremediaTableModel
}
export interface IWalletWithFaremediaTableModel {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: IWalletWithFaremediaModel[]
}
export interface IResponseWalletWithFaremediaModel extends ResponseMessageModel {
  data: ICustomerWithWalletModel
}

export interface IInfo4AddObuModel {
  carModel: ICarMasterData[]
  province: IProvinceMasterData[]
}

export interface IResponseInfo4AddObuModel extends ResponseMessageModel {
  data: IInfo4AddObuModel
}

export interface IFaremedia {
  faremediaTypeId: number;
  faremediaType: string;
  faremediaStatusId: number;
  faremediaStatus: string;
  faremediaValue: string;
  faremediaGroup: number;
  isType9: boolean;
  carClass: string;
  carModel: string;
  carSubmodel: string;
  carColor: string;
  plateNo: string;
  plateProvince: string;
  carYear: string;
  createDate: string;
  updateDate: string;
  cardNo: string;
}
export interface IFaremediasInFoResponse extends ResponseMessageModel {
  data: IFaremedia[]
}
export interface IReplaceObuResponse extends ResponseMessageModel {
  jsonnpc: string,
  result: {},
  id: string,
}

export interface IBasePageModel {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
}

export interface ILogModel {
  CustomerId: string,
  CustomerName: string,
  WalletId: string,
  WalletName: string,
  faremediaValue: string,
  plateNo: string,
  requestId: string,
  action: string,
  detail: IJsonField,
  createdDate: string,
}
export interface ILogRowModel {
  log: ILogModel
  meaning: string
}

export interface IJsonField {
  type: string,
  value: string,
  null: boolean
}

export interface ILogTable extends IBasePageModel {
  elements: ILogModel[]
}

export interface IResponseLogModel extends ResponseMessageModel {
  data: ILogTable
}

export interface IActionOptionResponse extends ResponseMessageModel {
  data: string[]
}
export interface IVerifyOtpResponse {
  isValid: boolean
  recipient: string
  reasonCode: string
  msg: any
}