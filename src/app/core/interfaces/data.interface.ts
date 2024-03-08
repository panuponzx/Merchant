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
  obuPan: string
}

export interface ObuInfoModel {
  index: number,
  isType9: boolean
  obuPan: string,
  obuStatus: number,
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
  cardExpDate: string,
  channelId: number,
  citizenDocId: number,
  citizenId: string,
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
