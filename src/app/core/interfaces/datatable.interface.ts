export interface RowActionEventModel {
  type: string,
  format?: string,
  row: any,
  action?: string,
  index: number
}

export interface OBUColumModel  {
  id: string,
  status: string,
  Borrow:string,
}

export interface CustomColumnModel {
  id: string,
  prop: string,
  name: string,
  label: string,
  sortable: boolean,
  resizeable: boolean,
  width: number,
  minWidth: number,
  headerClass?: string,
  cellClass?: string,
  type: 'no' | 'paging-no' | 'number' | 'text' | 'date' | 'action' | 'check-uncheck' | 'text-with-boolean' | 'approve-status' | 'cancel' | 'currency' | 'text-with-boolean-click' | 'button'| 'checkbox',
  actionIcon?: {
    actionName: string,
    iconName: string,
    color: string,
    size: string
  },
  textWithBoolean?: {
    classCondition1?: string,
    classCondition2?: string,
    textCondition1: string,
    textCondition2: string
  }
  numberFormat?: string,
  date?: {
    format?: string,
    locale?: 'en' | 'th'
  }
  currency?: {
    currencyCode?: string,
    display?: string
    digitsInfo?: string,
    locale?: string
  }
  button?: {
    label: string
  }
}
