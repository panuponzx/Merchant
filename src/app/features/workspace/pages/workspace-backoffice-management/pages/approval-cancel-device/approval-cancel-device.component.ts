import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ITollPlazaModel, ITollPlazaResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-approval-cancel-device',
  templateUrl: './approval-cancel-device.component.html',
  styleUrl: './approval-cancel-device.component.scss'
})
export class ApprovalCancelDeviceComponent {

  public approval: number = 1;

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null = 'waiting-for-approval';

  public submitted: boolean = false;
  public form: FormGroup;

  public isHiddenFillter: boolean = false;
  public selctionTollPlaza: ITollPlazaModel[] = [];
  public maxDate: Date = new Date();
  private searchFunction: (startDate: Date, endDate: Date, tollPlaza: string) => void = () => { };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      startDate: new FormControl(undefined, [Validators.required]),
      endDate: new FormControl(undefined, [Validators.required]),
      checkpoint: new FormControl(undefined, [Validators.required])
    });
  }
  ngOnInit() {
    this.form.patchValue({
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date()
    });
    this.loadTollPlaza();
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
    this.searchFunction(this.form.value.startDate, this.form.value.endDate, this.form.value.checkpoint);
  }
  handleSearch(searchFn: (startDate: Date, endDate: Date, tollPlaza: string) => void) {
    console.log("[onSearch]");
    this.searchFunction = searchFn;
  }
  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }

  loadTollPlaza() {
    this.modalDialogService.loading();
    this._loadTollPlaza().subscribe({
      next: (response) => {
        this.modalDialogService.hideLoading();
        this.selctionTollPlaza = response.data;
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      }
    });
  }
  _loadTollPlaza() {
    return this.restApiService.getBackOffice('master-data/toll-plaza') as Observable<ITollPlazaResponse>;
  }
}
