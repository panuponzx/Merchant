import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-car-type9',
  templateUrl: './add-car-type9.component.html',
  styleUrl: './add-car-type9.component.scss'
})
export class AddCarType9Component {

  public step: number = 1;

  public userInfoType9Form: FormGroup;
  public carInfoType9Form: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.userInfoType9Form = this.formBuilder.group({

    });
    this.carInfoType9Form = this.formBuilder.group({

    });
  }

  onPreviousStep(step: string) {
    // console.log("[onPreviousStep] step => ", step);
    this.step--;
    console.log("[onPreviousStep] step => ", this.step);
    if (this.step === 0) {
      // this.router.navigate(['work-space/add-user']);
    }
  }

  onNextStep(step: string) {
    console.log("[onNextStep] step => ", step);
    this.step++;
  }

}
