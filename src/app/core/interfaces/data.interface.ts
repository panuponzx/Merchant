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

export interface PassageInformationModel {
  transactionId: string,
  walletId: number,
  amount: number,
  createDate: Date,
  properties: {
    recordId: string,
    amount: number,
    entry_hq: number,
    entry_plaza: number,
    exit_hq: number,
    exit_plaza: number,
    obuPan: string,
    requestDate: Date,
    transactionDate: Date,
    typeId: string,
    category: string,
    smartcardNo: string,
    raw: {
      exit_hq: number,
      entry_hq: number,
      trn_uuid: string,
      exit_lane: number,
      entry_lane: number,
      exit_plaza: number,
      entry_plaza: number
    }
  },
  isCancelled: boolean,
  wallet: {
    id: number,
    walletName: string
  }
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

