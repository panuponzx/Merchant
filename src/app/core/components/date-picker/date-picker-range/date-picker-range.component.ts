import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss','../date-picker.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerRangeComponent),
      multi: true,
    }
  ]
})
export class DatePickerRangeComponent implements ControlValueAccessor, OnChanges {

  @Input() public minDate: Date | undefined;
  @Input() public maxDate: Date | undefined;
  @Input() public maxDateRange: number | undefined;
  @Input() public id: string = 'dateRangePicker';

  @Input() public isDisabled: boolean = false;
  @Input() public placement: 'top' | 'bottom' | 'left' | 'right' = 'left';
  @Input() public outsideClick: boolean = true;
  @Input() public placeholder: string = 'From - To';
  @Input() public clearable: boolean = true;
  @Input() public date: Date[] | undefined = [];
  @Input() public invalid: boolean = false

  @Output() onChangeDate: EventEmitter<Date[] | undefined> =  new EventEmitter<Date[] | undefined>();
  private onTouched!: Function;
  private onChanged!: Function;

  @Input() public locale: string | undefined | 'en' | 'th';

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

  writeValue(date: Date[] | undefined): void {
    this.date = date;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeDate(event: Date[]) {
    this.onChangeDate.emit(this.date);
    if(this.onTouched) {
      this.onTouched();
    }
    if(this.onChanged) {
      this.onChanged(this.date);
    }
  }

  clearDate() {
    this.date = undefined;
    this.onChangeDate.emit(this.date);
    if(this.onTouched) {
      this.onTouched();
    }
    if(this.onChanged) {
      this.onChanged(this.date);
    }
  }

}
