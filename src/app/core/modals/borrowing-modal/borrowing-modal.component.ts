import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';
import { Observable, zip } from 'rxjs';
import { RestApiService } from '../../services';
import { IReponseRegisterTestFaremediaModel, IReturnTestFaremediaResponseModel } from '../../interfaces';
import Swal from 'sweetalert2';

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
  minDate: string;

  constructor(
    public fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    public restApiService: RestApiService,
    public modalDialogService: ModalDialogService,
  ) {
    this.minDate = this.formatDate(new Date());
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
  async ngOnInit(): Promise<void> {
    if (this.actionType === 'return') {
      this.form = this.fb.group({
        name: new FormControl({ value: undefined, disabled: true }, Validators.required),
        institution: new FormControl({ value: undefined, disabled: true }),
        date: new FormControl({ value: this.formatDate(new Date()), disabled: true }, Validators.required),
        remark: new FormControl({ value: undefined, disabled: false }),
      });
      zip(
        await this.getReturnTestFaremediaInfo()
      ).pipe().subscribe({
        next: (response) => {
          this.form.patchValue({
            name: response[0].data.name,
            institution: response[0].data.institute,
            remark: response[0].data.remark,
          });
        },
        error: (error) => {
          console.error(error);
          this.ngbActiveModal.dismiss(error);
        }
      });
    } else {
      this.form = this.fb.group({
        name: new FormControl({ value: undefined, disabled: false }, Validators.required),
        institution: new FormControl({ value: undefined, disabled: false }),
        date: new FormControl({ value: this.formatDate(new Date()), disabled: true }, Validators.required),
        returnDate: new FormControl({ value: undefined, disabled: false }, Validators.required),
        remark: new FormControl({ value: undefined, disabled: false }),
      });
    }
  }
  onClose() {
    this.ngbActiveModal.close(null);
  }
  async onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.modalDialogService.loading();
    zip(
      await this.borrowOrReturnTestFaremedia()
    ).pipe().subscribe(
      (response) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.ngbActiveModal.close(true);
      },
      async (error) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        console.error(error);
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิลพลาด!',
          text: 'กรุณาลองใหม่อีกครั้ง',
          timer: 2000
        });
        this.ngbActiveModal.dismiss(error);
      });
  }
  async getReturnTestFaremediaInfo() {
    return this.restApiService.getBackOffice('faremedia/borrow-test-obu/' + this.faremediaValue) as Observable<IReturnTestFaremediaResponseModel>;
  }
  async borrowOrReturnTestFaremedia() {
    let mockupData;
    if (this.actionType === 'borrow') {
      mockupData = {
        faremediaValue: this.faremediaValue,
        name: this.form.value.name,
        institution: this.form.value.institution,
        expectedReturnDate: this.form.value.returnDate,
      };
    } else {
      mockupData = {
        faremediaValue: this.faremediaValue,
        remark: this.form.value.remark,
      };
    }

    return this.restApiService.postBackOffice('faremedia/borrow-test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;

  }
}
