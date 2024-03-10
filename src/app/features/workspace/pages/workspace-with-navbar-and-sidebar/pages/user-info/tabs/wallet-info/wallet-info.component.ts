import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, ObuInfoModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel } from '../../../../../../../../core/interfaces';
import { first, map } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss'
})
export class WalletInfoComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;

  public isCollapsedPrepaid: boolean = true;
  public isCollapsedPostpaid: boolean = true;
  public isCollapsedDirectCredit: boolean = true;
  public isCollapsedType9: boolean = true;

  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'ลำดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'brand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'model', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'color', name: 'Color', label: 'สีรถ', prop: 'color', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'licensePlate', name: 'licensePlate', label: 'หมายเลขทะเบียนรถ', prop: 'licensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'yearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'type', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public walletList: any[] = [];
  public isLoading: boolean = false;

  public limitRow: number = 5;
  public pages: number = 1;

  constructor(private restApiService: RestApiService) {

  }


  ngOnInit(): void {
    this.loadWalletInfo();
  }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    return this.restApiService
      .post('get-summary', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseWalletSummaryModel)
      ).subscribe({
        next: (res) => {
          this.setWallet(res.lstSummary);
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  setWallet(lstSummary: WalletSummaryModel[]) {
    let walletArr: any = [];
    lstSummary.forEach((wallet) => {
      wallet.lstObus.forEach((obu: any) => {
        wallet.lstCars.filter((car) => {
          if (Object.keys(car).length !== 0 && car.index === obu.index) {
            const hasDuplicateId = walletArr.some((value: any) => value.walletId === wallet.walletId);
            if (!hasDuplicateId) {
              const mergedArray = wallet.lstCars.reduce((acc: any, obj1) => {
                const matchingObj2 = wallet.lstObus.find(obj2 => obj2.index === obj1.index);
                if (matchingObj2) {
                  acc.push({ ...obj1, ...matchingObj2 });
                }
                return acc;
              }, []);
              walletArr.push({
                lstCars: wallet.lstCars,
                lstObus: wallet.lstObus,
                row: mergedArray,
                totalBalance: wallet.totalBalance,
                totalPoint: wallet.totalPoint,
                totalPointBalance: wallet.totalPointBalance,
                walletId: wallet.walletId,
                walletName: wallet.walletName,
                walletStatus: wallet.walletStatus,
                walletTypeId: wallet.walletTypeId,
                walletTypeName: wallet.walletTypeName,
              });
            }
          }
        });
      })
    })
    this.walletList = [...walletArr];
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
