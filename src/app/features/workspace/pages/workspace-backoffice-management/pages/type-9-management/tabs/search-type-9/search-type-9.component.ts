import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterCustomerType9Component } from '../../../../modals/register-customer-type-9/register-customer-type-9.component';

@Component({
  selector: 'search-type-9',
  templateUrl: './search-type-9.component.html',
  styleUrl: './search-type-9.component.scss'
})
export class SearchType9Component {
  formSearch: FormGroup;
  public isLoading: boolean = false;
  public refreshTrigger: number = 0;
  public hiddenSearchMenu: boolean = false;
  constructor(
    private ngbModal: NgbModal,
    private cdr: ChangeDetectorRef
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl({ value: undefined, disabled: false }, [Validators.required])
    });
  }
  onRegister() {
    const modalRef = this.ngbModal.open(RegisterCustomerType9Component, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.result.then(
      (result) => {
        if (result) {
          this.refreshTrigger++;
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }
  handleHiddenSearchMenu(value: boolean) {
    this.hiddenSearchMenu = value;
    this.cdr.detectChanges();
  }
}
