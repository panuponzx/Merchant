import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car-type9',
  templateUrl: './add-car-type9.component.html',
  styleUrl: './add-car-type9.component.scss'
})
export class AddCarType9Component {

  public step: number = 1;

  public userInfoType9Form: FormGroup;
  public carInfoType9Form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    ){
    this.userInfoType9Form = this.formBuilder.group({
      company: new FormControl(undefined, Validators.required),
      citizenId: new FormControl(undefined, Validators.required),
      cardExpDate: new FormControl(undefined, Validators.required),
      gender: new FormControl('M', Validators.required),
      department: new FormControl(undefined, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      birthDate: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
    });
    this.carInfoType9Form = this.formBuilder.group({
      obuPan: new FormControl(undefined, Validators.required),
      smartcardNo: new FormControl(undefined, Validators.required),
      licensePlate: new FormControl(undefined, Validators.required),
      brand: new FormControl(undefined, Validators.required),
      model: new FormControl(undefined, Validators.required),
      yearRegistration: new FormControl(undefined, Validators.required),
    });
  }

  onPreviousStep(step: string) {
    // console.log("[onPreviousStep] step => ", step);
    this.step--;
    console.log("[onPreviousStep] step => ", this.step);
    if (this.step === 0) {
      this.router.navigate(['work-space/menu-option-super-admin']);
    }
  }

  onNextStep(step: string) {
    console.log("[onNextStep] step => ", step);
    this.step++;
  }

}
