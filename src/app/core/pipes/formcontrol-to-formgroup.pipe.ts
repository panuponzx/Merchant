import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formControlToFormGroup'
})
export class FormcontrolToFormgroupPipe implements PipeTransform {


  transform(value: AbstractControl): FormGroup | undefined {
    const formGroup = value as FormGroup;
    if (Object.keys(formGroup.controls).length === 0) {
      return undefined;
    } else {
      return value as FormGroup;
    }

  }
}
