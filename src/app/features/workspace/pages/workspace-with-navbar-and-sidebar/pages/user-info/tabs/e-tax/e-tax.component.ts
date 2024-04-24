import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import { ICustomerEtaxResModel } from '../../../../../../../../core/interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpRequestModalComponent } from '../../../../modals/otp-request-modal/otp-request-modal.component';

@Component({
  selector: 'e-tax',
  templateUrl: './e-tax.component.html',
  styleUrls: ['./e-tax.component.scss']
})
export class ETaxComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;

  public form: FormGroup;

  public status: number = 1;
  public Usagestatus = [
    {
      label: 'ปิดการใช้งาน',
      id: false
    },
    {
      label: 'เปิดการใช้งาน',
      id: true
    }
  ];

  public level: number = 2;
  public Settinglevel = [
    {
      label: 'การตั้งค่าขั้นพื้นฐาน',
      id: 1
    },
    {
      label: 'การตั้งค่าขั้นสูง',
      id: 2
    }
  ];

  customerEtax = {} as ICustomerEtaxResModel;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private ngbModal: NgbModal,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      isEtaxActive: new FormControl({ value: undefined, disabled: false }, Validators.required),
      etaxSettingLevel: new FormControl({ value: 1, disabled: false }, Validators.required),
      emailType0: new FormControl({ value: undefined, disabled: true }, Validators.required),
      emailType1: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isEtaxActive1: new FormControl({ value: false, disabled: false }, Validators.required),
      emailType2: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isEtaxActive2: new FormControl({ value: false, disabled: false }, Validators.required),
      emailType3: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isEtaxActive3: new FormControl({ value: false, disabled: false }, Validators.required),
      emailType4: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isEtaxActive4: new FormControl({ value: false, disabled: false }, Validators.required),
      emailType5: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isEtaxActive5: new FormControl({ value: false, disabled: false }, Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadEtax();
  }

  loadEtax() {
    const mockupData = {
      customer: {
        id: this.customerId,
      },
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    return this.restApiService
      .postBackOffice('customer/etax/get', mockupData)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          console.log("[loadEtax] res => ", res);
          if (res.errorMessage === "Success") {
            this.customerEtax = res.customer;
            this.setFormGroup(res.customer);
            console.log("[loadEtax] customerEtax => ", this.customerEtax.id);
          } else {

          }
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  setFormGroup(customerEtax: ICustomerEtaxResModel) {
    this.form.get('isEtaxActive')?.setValue(customerEtax.isEtaxActive);
    if (customerEtax.etaxSettingLevel === 1 || customerEtax.etaxSettingLevel === 2) {
      this.form.get('etaxSettingLevel')?.setValue(customerEtax.etaxSettingLevel);
      if (customerEtax.etaxSettingLevel === 1) this.form.get('emailType0')?.setValue(customerEtax.customerEtax[0].email);
    }
    for (let i = 0; i < customerEtax.customerEtax.length; i++) {
      console.log(customerEtax.customerEtax[i]);
      switch (customerEtax.customerEtax[i].etaxTypeId) {
        case 1: {
          console.log(customerEtax.customerEtax[i].email);
          
          this.form.get('emailType1')?.setValue(customerEtax.customerEtax[i].email);
          this.form.get('isEtaxActive1')?.setValue(customerEtax.customerEtax[i].isEtaxActive);
          break;
        }
        case 2: {
          this.form.get('emailType2')?.setValue(customerEtax.customerEtax[i].email);
          this.form.get('isEtaxActive2')?.setValue(customerEtax.customerEtax[i].isEtaxActive);
          break;
        }
        case 3: {
          this.form.get('emailType3')?.setValue(customerEtax.customerEtax[i].email);
          this.form.get('isEtaxActive3')?.setValue(customerEtax.customerEtax[i].isEtaxActive);
          break;
        }
        case 4: {
          this.form.get('emailType4')?.setValue(customerEtax.customerEtax[i].email);
          this.form.get('isEtaxActive4')?.setValue(customerEtax.customerEtax[i].isEtaxActive);
          break;
        }
        case 5: {
          this.form.get('emailType5')?.setValue(customerEtax.customerEtax[i].email);
          this.form.get('isEtaxActive5')?.setValue(customerEtax.customerEtax[i].isEtaxActive);
          break;
        }
      }
    }
  }

  public openModal(etaxTypeId: number) {
    // this.router.navigate(['/work-space/modals/email-verification-modal']);
    // const data = {
    //   customer: {
    //     id: this.customerId,
    //     isEtaxActive: this.form.get('isEtaxActive')?.value,
    //     etaxSettingLevel: this.form.get('etaxSettingLevel')?.value,
    //     customerEtax: [
    //       {
    //         etaxTypeId: 0,
    //         email: 'abc@hotmail.com',
    //       }
    //     ],
    //   },
    //   requestParam: {
    //     reqId: "23498-sss-k339c-322s2",
    //     channelId: "1"
    //   }
    // };
    // return this.restApiService
    //   .postBackOffice('customer/etax/edit', data)
    //   .pipe(
    //     first(),
    //     map(res => res as any)
    //   ).subscribe({
    //     next: (res) => {
    //       console.log("[loadEtax] res => ", res);
    //       if(res.errorMessage === "Success") {
    //         this.customerEtax = res.customer;
    //         this.setFormGroup(res.customer);
    //         console.log("[loadEtax] customerEtax => ", this.customerEtax.id);
    //       }else {

    //       }
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     }
    //   });
    const modalRef = this.ngbModal.open(OtpRequestModalComponent, {
      centered: true,
      backdrop: 'static',
      // size: 'xl',
      keyboard: false,
    });
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.formEtax = this.form;
    modalRef.componentInstance.etaxTypeId = etaxTypeId;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAction] result => ', result);
          this.loadEtax();
          // if(result && this.tempSearch) this.loadPassageInformation(this.tempSearch);
        }
      },
      (reason) => {
        console.log('[onAction] reason => ', reason);
      }
    );
  }

}
