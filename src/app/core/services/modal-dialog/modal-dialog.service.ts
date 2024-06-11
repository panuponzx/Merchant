import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModalComponent } from '../../modals/loading-modal/loading-modal.component';
import { InfoModalComponent } from '../../modals/info-modal/info-modal.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  public modalInfoRef: NgbModalRef | undefined;
  public modalLoadingRef: NgbModalRef | undefined;

  constructor(private ngbModal: NgbModal) {
  }
  public loading(): Promise<boolean> {
    console.log("[loading]");
    this.hideLoading();
    this.modalLoadingRef = this.ngbModal.open(LoadingModalComponent, {
      windowClass: 'loading-modal',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    return this.modalLoadingRef.result;
  }

  public hideLoading() {
    if (this.modalLoadingRef) this.modalLoadingRef.close(true);
  }

  public handleError(error: any) {
    let errorMessage = "";
    if (error.body) {
      if (error.body.errorMessage && !error.body?.errorMessage?.toLowerCase().includes('internal server error')) {
        errorMessage = error.body.errorMessage;
      } else {
        errorMessage = error.body.throwableMessage;
      }
    } else {
      errorMessage = error.error.errorMessage;
    }
    // console.log('errorMessage: ', errorMessage);
    this.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorMessage);
  }

  public info(
    icon: string,
    color: string,
    title: string,
    message?: string
  ) {
    if (this.modalInfoRef) { this.modalInfoRef.close(true); }
    this.modalInfoRef = this.ngbModal.open(InfoModalComponent, {
      windowClass: 'info-modal',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    this.modalInfoRef.componentInstance.icon = icon;
    this.modalInfoRef.componentInstance.color = color;
    this.modalInfoRef.componentInstance.title = title;
    this.modalInfoRef.componentInstance.message = message;
    // setTimeout(() => {
    //   this.hideInfo();
    // }, 2000);
    return this.modalInfoRef.result;
  }

  public hideInfo() {
    if (this.modalInfoRef) this.modalInfoRef.close(true);
  }

  public confirm(
    title: string,
    message: string,
    btnCancelText: string = 'Cancel',
    btnOkText: string = 'OK',
    icon?: string
  ) {
    const modalRef = this.ngbModal.open(ConfirmModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.icon = icon;
    return modalRef.result;
  }

}
