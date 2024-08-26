import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-test-card-registration',
  templateUrl: './test-card-registration.component.html',
  styleUrls: ['./test-card-registration.component.scss']
})
export class TestCardRegistrationComponent {
  public approval: number = 1;

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null = 'waiting-for-approval';

  public submitted: boolean = false;
  public form: FormGroup;

  public isHiddenFillter: boolean = false;

  public maxDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private ngbModal: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      startDate: new FormControl(undefined, [ Validators.required ]),
      endDate: new FormControl(undefined, [ Validators.required ]),
      checkpoint: new FormControl(undefined, [ Validators.required ])
      // search: new FormControl(undefined, [Validators.required])
    });
  }
  
  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
  }
  
  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }

  // เพิ่มฟังก์ชัน openFormModal
  RegisterFormModal() {
    const initialData = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    this.modalDialogService.RegisterFormModal(initialData).then(
      (result) => {
        if (result) {
          console.log('Form submitted with:', result);
          
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }
}
