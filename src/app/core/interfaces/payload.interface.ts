import { DateType } from "../types";

export interface HistoryPayloadModel {
  walletId: string,
  startDate?: Date | string | undefined | null,
  offset: number,
  limit: number
}
