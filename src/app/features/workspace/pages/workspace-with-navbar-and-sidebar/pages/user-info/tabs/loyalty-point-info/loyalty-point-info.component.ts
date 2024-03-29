import { Component, Input, OnInit } from '@angular/core';
import { zip, first, map } from 'rxjs';
import { CustomColumnModel, CarInfoModel, ReponseWalletSummaryModel, WalletSummaryModel, ReponseCustomerObuModel, ObuInfoModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'loyalty-point-info',
  templateUrl: './loyalty-point-info.component.html',
  styleUrl: './loyalty-point-info.component.scss'
})
export class LoyaltyPointInfoComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;

  public activeTab: 'get-point' | 'use-point' | undefined;

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public getPointColumns: CustomColumnModel[] = [
    { id: 'date', name: 'Date', label: 'วันที่ และ เวลา', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'getPoint', name: 'GetPoint', label: 'ได้รับคะแนน', prop: 'getPoint', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'totalPoint', name: 'TotalPoint', label: 'คะแนนคงเหลือ', prop: 'totalPoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'type', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'getPointFrom', name: 'GetPointFrom', label: 'ได้รับคะแนนจาก', prop: 'getPointFrom', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];

  public usePointColumns: CustomColumnModel[] = [
    { id: 'date', name: 'Date', label: 'วันที่ และ เวลา', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'usePoint', name: 'UsePoint', label: 'ใช้คะแนน', prop: 'usePoint', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'totalPoint', name: 'TotalPoint', label: 'คะแนนคงเหลือ', prop: 'totalPoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'detailExchangePoint', name: 'DetailExchangePoint', label: 'รายละเอียดการแลกคะแนน', prop: 'detailExchangePoint', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];

  public getPointRows: any[] = [];
  public usePointRows: any[] = [];

  public isLoading: boolean = false;

  constructor(
    private restApiService: RestApiService
  ) {
    this.getPointRows = [
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
      {
        date: '2024-03-05 14:06:17',
        getPoint: '+10',
        totalPoint: '110',
        type: 'คะแนนผ่านทาง',
        getPointFrom: 'ด่านอาคาร 1'
      },
    ];

    this.usePointRows = [
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
      {
        date: '2024-03-05 14:06:17',
        usePoint: '-100',
        totalPoint: '110',
        detailExchangePoint: 'แลกกระเป๋าผ้า'
      },
    ];
  }

  ngOnInit(): void {

  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

  onChangeNav() {
    this.pages = 1;
  }

}