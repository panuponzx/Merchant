export interface RowActionEventModel {
  type: string,
  format?: string,
  row: any,
  action?: string,
  index: number
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
  type: 'no' | 'number' | 'text' | 'date' | 'action' | 'check-uncheck' ,
  actionIcon?: {
    actionName: string,
    iconName: string,
    color: string,
    size: string
  }
  numberFormat?: string,
  date?: {
    format?: string,
    locale?: 'en' | 'th'
  }
}
