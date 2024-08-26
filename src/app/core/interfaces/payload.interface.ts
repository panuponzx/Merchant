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
  firstName: string
  lastName: string
  gender: string
  phoneNo: string
  citizenCardIdentify: boolean
  passportIdentify: boolean
  birthdate: string
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