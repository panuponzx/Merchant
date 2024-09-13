import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterCustomerType9Component } from '../../../../modals/register-customer-type-9/register-customer-type-9.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-type-9',
  templateUrl: './search-type-9.component.html',
  styleUrl: './search-type-9.component.scss',
  animations: [
    trigger('fadeInOutTable', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
    ]),
    trigger('fadeInOutseach', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]), trigger('fadeInseach', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ]), trigger('slideInOutSearch', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),

    trigger('zoomInOutTable', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0)' }))
      ])
    ]),

    trigger('staggeredEntrance', [
      transition(':enter', [
        query('.search-user-content-wrapper > *', stagger(100, [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]))
      ])
    ])
  ]
})
export class SearchType9Component {
  formSearch: FormGroup;
  public customerName: string = "";
  public walletName: string = "";
  public faremediaValue: string = "";
  public plateNo: string = "";
  public isLoading: boolean = false;
  public refreshTrigger: number = 0;
  public isSearch: boolean = false;
  public hiddenSearchMenu: boolean = false;
  formTypeSearch: FormGroup = new FormGroup({
    searchType: new FormControl({ value: "customerName", disabled: false }, [Validators.required])
  });
  constructor(
    private ngbModal: NgbModal,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl({ value: undefined, disabled: false }, [Validators.required])
    });
  }
  search() {
    if (this.formSearch.valid) {
      if (this.formTypeSearch.value.searchType == "customerName") {
        this.customerName = this.formSearch.value.search;
        this.refreshTrigger++;
        this.isSearch = true;
      }
      else {
        this.router.navigate(['/work-space/type-9-management/wallet-type-9-management/', this.formSearch.value.search], { relativeTo: this.activatedRoute, queryParams: { searchType: this.formTypeSearch.value.searchType } });
      }
    }
  }
  clearSearch() {
    this.formSearch.get('search')?.setValue('');
    this.customerName = '';
    this.refreshTrigger++;
    this.isSearch = false;
  }
  onChangeCiteria() {
    this.formSearch.get('search')?.setValue('');
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
