import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';
import { Observable } from 'rxjs';
import { RestApiService } from '../../services';
import { IBorrowTestFaremediaRequest, IReponseRegisterTestFaremediaModel, IResponseModel, IReturnTestFaremediaResponseModel, ITestFaremediaRegisterModel } from '../../interfaces';

@Component({
  selector: 'app-borrowing-modal',
  templateUrl: './borrowing-modal.component.html',
  styleUrls: ['./borrowing-modal.component.scss']
})
export class BorrowingModalComponent {
  @Input() title: string = '';
  @Input() actionType: 'borrow' | 'return' = 'borrow';
  @Input() faremediaValue: string = '';
  @Output() formSubmit = new EventEmitter<any>();
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({});
  minDate: Date;

  constructor(
    public fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    public restApiService: RestApiService,
    public modalDialogService: ModalDialogService,
  ) {
    this.minDate = new Date();
  }
  formatDate(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  ngOnInit() {
    console.log("[BorrowingModalComponent] actionType => ", this.actionType);
    if (this.actionType === 'return') {
      this.form = this.fb.group({
        name: new FormControl({ value: undefined, disabled: true }, Validators.required),
        institution: new FormControl({ value: undefined, disabled: true }),
        date: new FormControl({ value: new Date(), disabled: false }, Validators.required),
        remark: new FormControl({ value: undefined, disabled: false }),
      });
      this.getReturnTestFaremediaInfo().subscribe({
        next: (response) => {
          this.form.patchValue({
            name: response.data.name,
            institution: response.data.institute,
            remark: response.data.remark,
          });
        },
        error: (error) => {
          console.error(error);
          this.ngbActiveModal.dismiss(error);
        }
      });
    }
    else {
      this.form = this.fb.group({
        name: new FormControl({ value: undefined, disabled: false }, Validators.required),
        institution: new FormControl({ value: undefined, disabled: false }),
        date: new FormControl({ value: new Date(), disabled: false }, Validators.required),
        returnDate: new FormControl({ value: undefined, disabled: false }, Validators.required),
        remark: new FormControl({ value: undefined, disabled: false }),
        file: new FormControl({ value: undefined, disabled: false }),
        attachmentNumber: new FormControl({ value: undefined, disabled: false }, Validators.required),
      });
    }
  }
  onClose() {
    this.ngbActiveModal.close(null);
  }
  onDateChange(event: any) {

  }
  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('file')?.setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('attachDocument')?.value);
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.modalDialogService.loading();
    this.borrowOrReturnTestFaremedia().subscribe({
      next: (_) => {

        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.ngbActiveModal.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
        this.ngbActiveModal.dismiss(error);
      }
    }
    );
  }
  getReturnTestFaremediaInfo() {
    return this.restApiService.getBackOffice('faremedia/borrow-test-obu/' + this.faremediaValue) as Observable<IReturnTestFaremediaResponseModel>;
  }
  borrowOrReturnTestFaremedia(): Observable<any> {
    console.log("[borrowOrReturnTestFaremedia] this.actionType => ", this.form.value);
    if (this.actionType === 'borrow') {
      const formData: FormData = new FormData();
      let requsetParam = this.restApiService.generateRequestParam();
      formData.append('reqId', requsetParam.reqId);
      formData.append('channelId', String(requsetParam.channelId));
      formData.append('faremediaValue', this.faremediaValue);
      formData.append('name', this.form.value.name);
      formData.append('institute', this.form.value.institution);
      formData.append('borrowDate', this.formatDate(this.form.value.date));
      formData.append('expectedReturnDate', this.formatDate(this.form.value.returnDate));
      formData.append('remark', this.form.value.remark !== undefined ? this.form.value.remark : '');
      formData.append('fileNo', this.form.get('attachmentNumber')?.value);
      formData.append('file', this.form.get('file')?.value);
      return this.restApiService.postBackOfficeFileFormDataWithModel<IBorrowTestFaremediaRequest, ITestFaremediaRegisterModel>('faremedia/borrow-test-obu', formData) as Observable<IResponseModel<ITestFaremediaRegisterModel>>;

    }
    else {
      let mockupData;
      console.log("[borrowOrReturnTestFaremedia] this.form.value => ", this.form.value);
      mockupData = {
        faremediaValue: this.faremediaValue,
        returnDate: this.formatDate(this.form.value.date),
        remark: this.form.value.remark,
      };

      return this.restApiService.postBackOffice('faremedia/return-test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;
    }


  }
}
function ViewChild(arg0: string, arg1: { static: boolean; }): (target: BorrowingModalComponent, propertyKey: "inputFileEl") => void {
  throw new Error('Function not implemented.');
}


