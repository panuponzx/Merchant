import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { RestApiService } from 'src/app/core/services/rest-api-service/rest-api.service';

@Component({
  selector: 'outstanding-bill',
  templateUrl: './outstanding-bill.component.html',
  styleUrl: './outstanding-bill.component.scss'
})
export class OutstandingBillComponent {

  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({
    numberInput: new FormControl(2, [Validators.required, Validators.min(1)])
  });



  constructor(
    private router: Router,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private FormBuilder: FormBuilder
  ) {
  }


  getOutstandingReport() {
    this.isLoading = true;
    this.modalDialogService.loading();
    const payload = {
      minOutstandingMonthLate: this.form.value.numberInput,
    };
    this.restApiService
      .postBackOfficeFile('bill/get/outstanding', payload)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.modalDialogService.hideLoading();
          let a = document.createElement('a');
          a.download = "outstanding-reort.csv";
          a.href = window.URL.createObjectURL(res);
          a.click();
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

}
