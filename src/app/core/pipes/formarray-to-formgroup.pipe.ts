import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formArrayToFormGroup'
})
export class FormarrayToFormgroupPipe implements PipeTransform {

  transform(value: AbstractControl): FormGroup[] {
    return (value as FormArray).controls as FormGroup[];
  }

}
