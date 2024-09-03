import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, Observable } from 'rxjs';
import { ICarMasterData, IFaremediasInFoResponse, IInfo4AddObuModel, IProvinceMasterData, IResponseInfo4AddObuModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrl: './add-car-modal.component.scss'
})
export class AddCarModalComponent {
  @Input() public walletId: string = '';
  @Input() public customerId: string = '';
  form: FormGroup;
  initialFormValue: any;
  public carModels: ICarMasterData[] = [];
  public provinces: IProvinceMasterData[] = [];
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = new FormGroup({
      faremediaValue: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      cardNo: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      plateNo: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      palteProvince: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      carModel: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      carSubmodel: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      carYear: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      carColor: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    });
  }
  onBack() {
    this.ngbActiveModal.close();
  }
  ngOnInit() {
    this.loadInfo4AddObu();
  }
  loadInfo4AddObu() {
    this._loadInfo4AddObu().subscribe({
      next: (res) => {
        this.carModels = res.data.carModel;
        this.provinces = res.data.province;
        this.initialFormValue = this.form.value;
      },
      error: (err) => {
        this.modalDialogService.handleError(err);
      }
    });
  }
  _loadInfo4AddObu() {
    return this.restApiService.getBackOffice('master-data/info-4-add-obu') as Observable<IResponseInfo4AddObuModel>
  }

  isFormModified(): boolean {
    return JSON.stringify(this.form.value) !== JSON.stringify(this.initialFormValue);
  }
  _addObu() {
    const payload = {
      car: {
        licensePlate: this.form.value.plateNo,
        brand: this.form.value.carModel,
        model: this.form.value.carSubmodel,
        yearRegistration: this.form.value.carYear,
        color: this.form.value.carColor,
        province: this.form.value.palteProvince,
        remark: ''
      },
      obu: {
        obuPan: this.form.value.faremediaValue,
        walletId: this.walletId,
        smartcardNo: this.form.value.cardNo,
        isType9: true
      },
      customer: {
        id: this.customerId,
      }
    };
    return this.restApiService.postBackOffice('faremedia/add-obu', payload) as Observable<any>;
  }



  onSubmit() {
    if (this.form.valid && this.isFormModified()) {
      this.modalDialogService.loading();
      this._addObu().subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.info('success', '#2255CE', 'เพิ่มอุปกรณ์สำเร็จ');
          this.ngbActiveModal.close(true);
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
        }
      });
    }
    else {
      this.form.markAllAsTouched();
    }
  }

}
