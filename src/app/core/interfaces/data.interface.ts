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
  floor: string,
  provinceCode: string,
  remark: string,
  soi: string,
  street: string,
  subdistrictCode: string,
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
  id: number,
  name: string,
  statusId: number,
  statusNmae: string,
  typeId: number,
  typeName: string,
  totalBalance: number,
  totalPointBalance: number,
  creditBalance: number,
  totalPoint: number,
  lastUse: Date
}
