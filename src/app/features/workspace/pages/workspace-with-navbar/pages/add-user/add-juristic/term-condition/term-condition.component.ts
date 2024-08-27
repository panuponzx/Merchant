import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IAcceptConsentRequest, IConsentResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'term-condition',
  templateUrl: './term-condition.component.html',
  styleUrl: './term-condition.component.scss'
})
export class TermConditionComponent implements OnInit {

  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;
  consentList: IConsentResponse[] = [];

  public isCollapsed = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      termAndCondition: new FormArray([])
    });
  }

  // get termAndCondition(): FormGroup[] {
  //   let formArray = this.form.get('termAndCondition') as FormArray;
  //   return (formArray.controls as FormGroup[])
  // }
  get termAndCondition() {
    return this.form.controls["termAndCondition"] as FormArray;
  }

  ngOnInit(): void {
    this.getTermCondition();
  }

  getTermCondition() {
    this.modalDialogService.loading();
    this.restApiService.getBackOfficeWithModel<IConsentResponse[]>(`consent/juristic-onboard/latest/th`).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        this.consentList = res.data;
        for (let i = 0; i < this.consentList.length; i++) {
          this.onAddtermAndCondition(this.consentList[i])
        }
        console.log("[getTermCondition] consentList => ", this.consentList);
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      }
    })
  }

  onAddtermAndCondition(consent: IConsentResponse) {
    const group = this.formBuilder.group({
      title: new FormControl(consent.title, Validators.required),
      content: new FormControl(consent.content, Validators.required),
      contentShort: new FormControl(consent.contentShort, Validators.required),
      contentType: new FormControl(consent.contentType, Validators.required),
      consentId: new FormControl(consent.consentId, Validators.required),
      isRequired: new FormControl(consent.isRequired, Validators.required),
      isAccepted: new FormControl(false, Validators.required),
    }, { validators: this.validateIsAccepted() });
    (this.form.get('termAndCondition') as FormArray).push(group);
  }

  validateIsAccepted(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isRequired = control.get('isRequired')?.value;
      const isAccepted = control.get('isAccepted')?.value;

      if (isRequired && !isAccepted) {
        // Invalid if `isRequired` is true but `isAccepted` is false
        return { isAcceptedInvalid: true };
      }
      return null;
    };
  }

  onSubmit() {
    this.postSubmitTermAndCondition();
    console.log("[onSubmit] form => ", this.form.get('termAndCondition')?.value);

  }

  onBack() {
    this.backStep.emit();
  }

  postSubmitTermAndCondition() {
    console.log("[postSubmitTermAndCondition] transactionId => ", this.transactionId);
    console.log("[postSubmitTermAndCondition] form => ", this.form.get('termAndCondition')?.value);
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IAcceptConsentRequest, any>(`consent/juristic-onboard/${this.transactionId}/accept`, this.form.get('termAndCondition')?.value).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if(res.errorMessage === "Success") {
          this.nextStep.emit();
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }
}
