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
  ref: string
}

export interface IVerifyOtpRequest {
  otp: string
  ref: string
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