import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBeginResponse, IOtpEmailResponse, IVerifyOtpRequest } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-juristic',
  templateUrl: './add-juristic.component.html',
  styleUrl: './add-juristic.component.scss'
})
export class AddJuristicComponent implements OnInit {

  public step: number = 6;
  public transactionId: string = '';

  // public verifyEmailOtpRequest = {} as IVerifyOtpRequest;
  // public verifyMobileOtpRequest = {} as IVerifyOtpRequest;

  public otpEmailResponse = {} as IOtpEmailResponse;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postBegin();
  }

  onNextStep() {
    this.step++;
  }

  onNextRequestOtpEmailStep(response: IOtpEmailResponse) {
    console.log("[onNextRequestOtpEmailStep] response => ", response);
    // this.verifyEmailOtpRequest.ref = response.ref;
    this.otpEmailResponse = response;
    this.step++;
  }

  onBackStep() {
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['work-space/add-user']);
    }
  }

  postBegin() {
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IBeginResponse>(`onboarding/begin`, null).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if(res.errorMessage === "Success") {
          this.transactionId = res.data.txnId;
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
        this.router.navigate(['work-space/add-user']);
      }
    })
  }

}
