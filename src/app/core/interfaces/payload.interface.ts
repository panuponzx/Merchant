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

export interface ITopupAndTollAddBaseRequest {
  takePoint: number
  remark?: string
  fromDate: string
  everyThaiBath: number
}

export interface ITopupAndTollAddRequest {
  campaignEvent?: string
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
}

export interface IAddPostpaidWalletRequest {
  customerId: string
  walletTypeId: number
  creditLimit: number
  car: ICarModel
  obu?: IObuModel
  rfid?: IRfidModel
  opt: IOptModel
  requestParam: IRequestParamModel
}

export interface ICarModel {
  brand: string
  model: string
  color: string
  province: string
  yearRegistration: string
  licensePlate: string
}

export interface IObuModel {
  obuPan: string
  smartcardNo: string
  smartcardExpiryDate: string
}

export interface IRfidModel {
  no: string
}

export interface IOptModel {
  addRfid: boolean
  addObu: boolean
  addSmartCard: boolean
  addLicensePlate: boolean
}

export interface IRequestParamModel {
  reqId: string
  channelId: number
}