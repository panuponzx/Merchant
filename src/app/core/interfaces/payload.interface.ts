export interface HistoryPayloadModel {
  walletId: string,
  from?: Date | string | undefined | null,
  to?: Date | string | undefined | null,
  page: number
}

export interface PassageInformationPayloadModel {
  walletId: number,
  from?: Date | string | undefined | null,
  to?: Date | string | undefined | null,
  page: number,
}

export interface TopupPayloadModel {
  walletId: string,
  from?: Date | string | undefined | null,
  to?: Date | string | undefined | null,
  page: number
}

export interface IAcceptConsentRequest {
  consentId: string,
  isAccepted: boolean
}

export interface IVerifyOtpRequest {
  otp: string
  sysReference: string
}

export interface ISaveContactPersonRequest {
  citizenId: string
  laserCode: string
  gender: string
  titleName: string
  firstName: string
  lastName: string
  phoneNo: string
  birthDate: string
  cardExpDate: string
}

export interface ISaveJuristicInfoRequest {
  houseNo: string
  building: string
  floor: string
  village: string
  moo: string
  street: string
  soi: string
  alley: string
  subDistrictCode: string
  districtCode: string
  provinceCode: string
  postcode: string
  corporateRegistrationNo: string
  corporateName: string
  branchTypeCode: string
  branchCode: string
  branchName: string
}

export interface IJuristicDocumentRequest {
  file: File
  docName: string
  docTypeCode: string
  docType: string
}

export interface ISaveBillingAddressRequest {
  houseNo: string
  building: string
  floor: string
  village: string
  moo: string
  street: string
  soi: string
  alley: string
  subDistrictCode: string
  districtCode: string
  provinceCode: string
  postcode: string
  sameCompanyAddress: boolean
}

export interface IJuristicConfirmRequest {
  useEmailApplicationResult: boolean
  useMobileApplicationResult: boolean
}

export interface ISearchJuristicRequest {
  identificationId?: string
  firstName?: string
  lastName?: string
  mobilePhone?: string
  limit: number
  page: number
}

export interface IBorrowTestFaremediaRequest {
  reqId: string
  channelId: string
  faremediaValue: string
  name: string
  institute: string
  borrowDate: string
  expectedReturnDate: string
  remark: string
  fileNo: string
  file: File
}

export interface IProductAddItemRequest {
  id?: string
  materialCode: string
  imgUrl: string
  pointUse: number
  creditReceive: number
  itemTypeCode: string
  startDate: string
  expiryDate: string
  validityDate: string
  isActive: boolean
  name: INameModel
  itemProperties: IItemPropertiesModel
  limitation: ILimitationModel
}

export interface IItemPropertiesModel {
  detail: INameModel
  condition: INameModel
  price: number
  customerCategoryCode: string[]
  calVat: boolean
  stockLocationCode: string
  dayToDeliver: number
  receiveWithinDays?: number
  fromPeriod: string
  toPeriod: string
}

export interface INameModel {
  th: string
  en?: string
}

export interface ILimitationModel {
  perItem: IPerItemModel
  perWallet: IPerWalletModel
  perAccount: IPerAccountModel
}

export interface IPerItemModel {
  limitType: string
  limit: number
}

export interface IPerWalletModel {
  limit: number
}

export interface IPerAccountModel {
  limit: number
}

export interface ICampaignAddRoadShowRequest {
  campaignName: string
  fromDate: string
  toDate: string
  fromPeriod: string
  toPeriod: string
  publish: boolean
  takePoint: number
  customerGroups: string[]
  isAllCustomerGroups: boolean
}