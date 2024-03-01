import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss','../date-picker.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnChanges {

  @Input() public minDate: Date | undefined;
  @Input() public maxDate: Date | undefined;
  @Input() public id: string = 'datePicker';

  @Input() public isDisabled: boolean = false;
  @Input() public placement: 'top' | 'bottom' | 'left' | 'right' = 'left';
  @Input() public outsideClick: boolean = true;
  @Input() public placeholder: string = 'Date';
  @Input() public clearable: boolean = true;
  @Input() public date: Date | undefined;
  @Input() public invalid: boolean = false

  @Output() onChangeDate: EventEmitter<Date | undefined> =  new EventEmitter<Date | undefined>();
  private onTouched!: Function;
  private onChanged!: Function;

  @Input() public locale: string | undefined | 'th' | 'en';

  constructor(
    private bsLocaleService: BsLocaleService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const localeChange = changes['locale'];
    if (localeChange && localeChange.currentValue && this.locale) {
      this.bsLocaleService.use(this.locale);
    }
  }

  writeValue(date: Date | undefined): void {
    this.date = date;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeDate(event: Date) {
    this.onChangeDate.emit(event);
    if(this.onTouched) {
      this.onTouched();
    }
    if(this.onChanged) {
      this.onChanged(this.date);
    }
  }

  clearDate() {
    this.date = undefined;
    this.onChangeDate.emit(undefined);
    if(this.onTouched) {
      this.onTouched();
    }
    if(this.onChanged) {
      this.onChanged(undefined);
    }
  }

}
