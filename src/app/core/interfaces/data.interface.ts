export interface WalletSummaryModel {
  totalBalance: number,
  totalPoint: number,
  totalPointBalance: number,
  walletId: number,
  walletName: string,
  walletStatus: number,
  walletTypeId: number,
  walletTypeName: string,
  lstCars: CarInfoModel[],
  lstObus: ObuInfoModel[]
}

export interface CarInfoModel {
  lias: string,
  brand: string,
  carId: number,
  carRegistration: string,
  color: string,
  index: number,
  model: string,
  remark: string,
  yearRegistration: string,
  walletId: number,
  smartcardNo: string,
  obuPan: string,
  licensePlate: string,
  isType9: boolean,
  obuStatus: number,
  province: string,
}

export interface IFareMedia {
  faremediaTypeId: number
  faremediaType: string
  faremediaStatusId: number
  faremediaStatus: string
  faremediaValue: string
  faremediaGroup: number
  isType9: boolean
  carClass: any
  carModel?: string
  carSubmodel: any
  carColor?: string
  plateNo?: string
  plateProvince: any
  carYear: any
  createDate: string
  updateDate: string
}

export interface ObuInfoModel {
  index: number,
  isType9: boolean
  obuPan: string,
  obuStatus: number,
  obuStatusText?: string,
  smartcardExpiryDate: Date,
  smartcardNo: string,
  smartcardStatus: number,
  walletId: number
}

export interface AddressModel {
  addressNo: string,
  building: string,
  createDate: Date,
  customerId: string,
  districtCode: string,
  districtName?: string,
  floor: string,
  provinceCode: string,
  provinceName?: string,
  remark: string,
  soi: string,
  street: string,
  subdistrictCode: string,
  subdistrictName?: string,
  typeId: number,
  typeName: string,
  alley: string,
  village: string,
  villageNo: string,
  zipcode: string
}

export interface CustomerModel {
  birthdate: string,
  branchTypeId: number,
  branchId?: string,
  cardExpDate: string,
  channelId: number,
  citizenDocId: number,
  citizenId: string,
  corporateBranch?: string,
  createDate: string,
  updateDate: string,
  customerTypeId: number,
  customerTypeName: string,
  email: string,
  firstName: string,
  firstNameEng: string,
  gender: string,
  id: string,
  lastName?: string,
  lastNameEng?: string,
  mobilePhone: string,
  occupation: string,
  status: number,
  taxId: string,
  title?: string
  titleEng?: string,
  corporateName?: string,
  corporatePhone?: string
}

export interface CustomerContact {
  id: string
  citizenId: string
  customerId: string
  dateOfBirth: any
  firstName: string
  gender: string
  lastName: string
  phone: string
  createBy: any
  createDate: string
  updateDate: any
}

export interface TransactionModel {
  amount: number,
  createDate: string,
  transactionId: string,
  typeId: string,
  walletId: number,
  walletStatus: number,
  walletTypeId: number
}

export interface TopupModel {
  transactionId: string,
  amount: 50,
  bankAccountNo: string,
  bankName: string,
  isCancelled: boolean,
  paymentMethod: string,
  settlementCode: string,
  status: string,
  transactionDate: Date,
  typeId: string,
  walletId: number,
  walletName: string,
  walletStatus: number,
  walletTypeId: number,
  createBy: string,
  createDate: Date
}

export interface ZipcodeModel {
  code: string
  districtId: number,
  id: number,
  provinceId: number,
  subdistrict: SubdistrictModel
  subdistrictCode: string
}

export interface SubdistrictModel {
  code: string,
  district: DistrictModel,
  districtId: number
  geoId: number,
  id: number,
  name: string,
  nameEn: string,
  provinceId: number
}

export interface DistrictModel {
  code: string,
  geoId: number,
  id: number,
  name: string,
  nameEn: string,
  province: ProvinceModel,
  provinceId: number
}

export interface ProvinceModel {
  code: string,
  geoId: number,
  id: number,
  name: string,
  nameEn: string
}

export interface ITransferModel {
  amount: number
  fromWalletId: number
  fromWalletName: string
  toWalletId: number
  toWalletName: string
  transactionDate: string
}

export interface IPassageInfoRowModel {
  gTransactionDate: any
  gObu: string
  gAmount: number
  gisCancelled: boolean
  transactionDate: any
  transactionId: string
  obu: string
  amount: number
  isCancelled: boolean
  smartCard: string
  walletName: string
  entryHqName: string
  entryPlazaName: string
  exitHqName: string
  exitPlazaName: string
  group: number
}

export interface ICustomerEtaxResModel {
  id: string
  isEtaxActive: boolean
  etaxSettingLevel: number
  customerEtax: any[]
  summaryInfoCustomerName: string
}
export interface IPaginationModel<T> {
  elements: T,
  page: number,
  pageSize: number,
  totalElements: number,
  totalPages: number
}

export interface ICustomerSearchModel {
  id: string,
  identification: string,
  mobilePhone: string,
  name: string,
}

export interface IProvinceMasterData {
  provinceId: string,
  provinceName: string,
  provinceNameEn: string,
}

export interface ICarMasterData {
  id: number,
  brand: string,

}
export interface IFaremediaModel {
  carBrand: string
  carModel: string
  carLicensePlate: string
  carYearRegistration: string
  obuNo: string
  smartCardNo: string
  walletName: string | null
}

export interface IEmailOtpModel {
  expire_time: string,
  limit_minute: string,
  recipient_email: string,
  ref_code: string,
  verify_token: string,
  verify_use: string,
}

export interface IEmailOtpVerifyModel {
  verified: boolean,
}

export interface IPassageModel {
  walletName: string,
  amount: number,
  entryHq: string,
  entryPlaza: string,
  exitHq: string,
  exitPlaza: string,
  isCancelled: boolean,
  transactionDate: string,
  transactionId: string,
  obuPan: string,
  smartcardNo: string,
}

export interface IWalletInfoModel {
  id: number
  name: string
  statusId: number
  statusName: string
  typeId: number
  typeName: string
  totalBalance: number
  totalPointBalance: number
  creditBalance: number
  totalPoint: number
  lastUse: Date
}

export interface IBill {
  id: string
  walletId?: string
  issueDate: string
  dueDate: string
  amount: number
  status?: string
  statusId?: number
  paidDate?: Date
  createDate?: Date
  updateDate?: Date
}
export interface IBillPayment {
  ref1: string
  ref2: string
  barCodeCrossBank: string
}

export interface IBillTransection {
  billId: string
  transactionAmount: number
  transactionDate: string
  transactionId: string
  updateDate: string
  createDate: string
}
export interface IBillDetail {
  header: IBill,
  transactions: IBillTransection[],
  payment: IBillPayment
}

export interface ICampaignTableModel {
  id: string
  campaignName?: string
  operation?: string
  calculateValue?: string
  customerTypes?: string[]
  carTypes?: string[]
  fromDate?: Date
  toDate?: Date
  publish?: boolean
  everyThaiBath?: number
  takePoint?: number
  fromPeriod?: string
  toPeriod?: string
  campaignType?: string
  carTypesText?: string | string[]
  carTypesList?: string | string[]
  isAllCarType?: boolean
  tollStations: string[]
  tollStationsText?: string | string[]
  tollStationsList?: string | string[]
  isAllTollStation?: boolean
}

export interface ICampaignModel {
  key: string
  name?: string
  nameEn?: string
}

export interface ICampaignTollModel {
  id: string
  tollCode?: string
  expresswayId?: string
  tollName?: string
}

export interface IPrefixModel {
  label: string;
  value: string;
}

export interface IJuristicModel {
  corporateRegistrationNo: string
  corporateName: string
  branchTypeCode: string
  branchCode: string
  branchName: string
}