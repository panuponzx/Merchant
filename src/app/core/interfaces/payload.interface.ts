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
