import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IOtpEmailResponse, IPrefixModel } from 'src/app/core/interfaces';
import { RestApiService, CustomRegEx } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import prefixData from 'src/assets/data/prefix.json';

@Component({
  selector: 'contact-person',
  templateUrl: './contact-person.component.html',
  styleUrl: './contact-person.component.scss'
})
export class ContactPersonComponent implements OnInit {

  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<IOtpEmailResponse>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;

  public prefixList: IPrefixModel[] = prefixData;

  public today: Date = new Date();
  
  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      // identityType: new FormControl(1, Validators.required),
      prefix: new FormControl(undefined, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      birthDate: new FormControl(undefined, Validators.required),
      citizenId: new FormControl(undefined, Validators.required),
      // cardExpDate: new FormControl(undefined, Validators.required),
      gender: new FormControl('M', Validators.required),
      phone: new FormControl(undefined, Validators.required),
    });
  }

  ngOnInit(): void {
    this.onCheckPrefix(this.form.get('prefix')?.value);
  }

  addTagPrefixPromise(name: string) {
    return new Promise((resolve) => {
      console.log("[]", this.prefixList);

      resolve({
        label: name,
        value: name
      })
    });
  }

  onCheckPrefix(prefix: string | null | undefined) {
    if (!prefix) return;
    const foundPrefix = this.prefixList.find((element) => element.value === prefix);
    if (!foundPrefix) {
      this.prefixList.push({
        value: prefix,
        label: prefix
      })
    }
  }

  onSubmit() {
    // this.postRequestOtpEmail();
  }

  onBack() {
    this.backStep.emit();
  }

}
