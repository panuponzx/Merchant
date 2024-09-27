import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
[x: string]: any;
  form: FormGroup = new FormGroup({
    walletName: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    bank: new FormControl('KTB', [Validators.required]),
    accountNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      this.passwordValidator
    ])
  });

  banks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBanks();
  }

  loadBanks() {
    this.http.get<any>('https://5a73-117-121-221-121.ngrok-free.app/master-data/bank')
      .subscribe(response => {
        if (response.errorCode === "E0") {
          this.banks = response.data;
        } else {
          console.error('Error loading banks:', response.errorMessage);
        }
      });
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const valid = hasLetter && hasNumber;
    return valid ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

  goBack() {
    console.log('Navigating back');
  }
}
