import { WalletSummaryModel, AddressModel, CustomerModel, ObuInfoModel, CarInfoModel, TransactionModel, TopupModel, ZipcodeModel, ITransferModel, IFaremediaModel, CustomerContact, IJuristicElementModel, IProvinceMasterData, ICarMasterData, IWalletModel, IBalanceModel } from "./data.interface"
import { IItemPropertiesModel, INameModel, IPerAccountModel, IPerItemModel, IPerWalletModel } from "./payload.interface"

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

export interface IMasterDataResponse {
  key: string
  name: string
  nameEN: string
}

export interface IMasterDataChildrenResponse {
  key: string
  name: string
  nameEN: string
  children: IMasterDataResponse[]
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
  elements: ITestFaremediaInfoRowModel[]
}
export interface ITestFaremediaInfoRowModel {
  faremediaValue: string,
  status: boolean,
  isReserved: boolean,
  update_date: string,
  create_date: string,
  faremediaStatus: number,
  attachmentNo: string,
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
  faremediaStatusName: string,
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
  log: ILogModel,
  meaning: string,
  actionMeaning: string,
  date: Date
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
export interface IResonsSuspendResponseModel extends ResponseMessageModel {
  data: IResonsSuspendModel[]
}
export interface IResonsSuspendModel {
  id: string
  name: string
}

export interface IChangeStatusTestFaremediaResponseModel extends ResponseMessageModel {
  data: IChangeStatusTestFaremediaModel
}
export interface IChangeStatusTestFaremediaModel {
  data: string,
  errorCode: string,
  errorMessage: string,
  throwableMessage: string
}

export interface IFaremediaOwnerInfoModel {
  faremediaValue: string;
  faremediaStatusId: number;
  faremediaStatus: string;
  cardNo: string;
  walletId: string;
  walletName: string;
  customerName: string;
  customerId: string;
}

export interface ResponseMessageModel {
  errorCode: string;
  errorMessage: string;
}

export interface IFaremediaOwnerInfoResponseModel extends ResponseMessageModel {
  data: IFaremediaOwnerInfoModel;
}

export interface IMaterialResponse {
  materialCode: string
  materialDescription: string
  serialNo: string
  plant: string
  location: string
  quantity: number
  unit: string
  exp: string
}

export interface ILoyaltyProductsResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: IElementLoyaltyProductsResponse[]
}

export interface IElementLoyaltyProductsResponse {
  id: string
  codeId: string
  name: INameModel
  imgBase64: any
  imgUrl: string
  pointUse: number
  detail: INameModel
  condition: INameModel
  itemTypeCode: string
  limitation: ILimitationResponseModel
  startDate: any
  expiryDate: string
  isActive: boolean
  qty: any
}
export interface ILimitationResponseModel {
  perItem: IPerItemModel
  perWallet: IPerWalletModel
  perAccount: IPerAccountModel
}
export interface ILoyaltyProductsByIdResponse {
  materialCode: string
  imgUrl: string
  pointUse: number
  creditReceive: any
  itemTypeCode: string
  startDate: string
  expiryDate: string
  validityDate: string
  isActive: boolean
  name: INameModel
  itemProperties: IItemPropertiesModel
  limitation: ILimitationResponseModel
  id: string
}

export interface IStockLocationResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: IElementStockLocationResponse[]
}

export interface IElementStockLocationResponse {
  id: number
  code: string
  name: string
  nameEn: string
  desc: string
  descEn: string
  logoUrl: string
  isActive: boolean
  sequence: number
  createdDate: string
  createdBy: string
  updatedDate: any
  updatedBy: any
}

export interface IWalletBalanceInterface {
  wallet: IWalletModel
  balance: IBalanceModel
}

export interface IWalletBalanceResponse extends ResponseMessageModel {
  data: IWalletBalanceInterface
}

export interface ICacutalateReturnInterface {
  walletId: number
  totalBalanceBefore: number
  totalBalanceAfter: number
  totalAmount: number
  totalBillingAmount: number
}

export interface ICacutalateReturnResponse extends ResponseMessageModel {
  data: ICacutalateReturnInterface
}
export interface ICampaignRoadShowAllResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: IElementCampaignRoadShowAllResponse[]
}

export interface IElementCampaignRoadShowAllResponse {
  campaignName: string
  fromDate: string
  toDate: string
  fromPeriod: string
  toPeriod: string
  publish: boolean
  takePoint: number
  customerGroups: string[]
  isAllCustomerGroups: boolean
  id: string
  lastModifyDate: any
  statusCode: any
}

export interface IRoadShowByIdResponse {
  campaignName: string
  fromDate: string
  toDate: string
  fromPeriod: string
  toPeriod: string
  publish: boolean
  takePoint: number
  customerGroups: string[]
  isAllCustomerGroups: boolean
  id: string
  lastModifyDate: any
  statusCode: any
}

export interface ITopupAndTollAddBaseActiveResponse {
  takePoint: number
  remark: any
  fromDate: any
  everyThaiBath: number
  id: string
  statusCode: number
  lastModifyDate: any
  campaignEvent?: string
}
export interface IAllTollStationsResponse {
  id: string
  expresswayId: string
  tollName: string
  tollCode: string
  createdDate: any
  updatedDate: any
}

export interface ICustomerSearchByCidResponse {
  page: number
  totalElements: number
  totalPages: number
  pageSize: number
  elements: ICustomerSearchByCidElementModel[]
}

export interface ICustomerSearchByCidElementModel {
  customerId: string
  date: string
  name: string
  status: number
  statusName: string
  empName: string
  isBlacklist: boolean
  customerType: number
}

export interface ICampaignTollResponse {
  campaignName: string
  fromDate: string
  toDate: string
  fromPeriod: string
  toPeriod: string
  publish: boolean
  operation: string
  calculateValue: number
  customerGroups: string[]
  isAllCustomerGroups: boolean
  carTypes: string[]
  isAllCarTypes: boolean
  tollStations: string[]
  isAllTollStation: boolean
  daysOfWeek: string[]
  isAllDaysOfWeek: boolean
  id: string
  lastModifyDate: any
  statusCode: any
}
