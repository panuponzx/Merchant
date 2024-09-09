import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, map } from 'rxjs';
import { IPassageModel, UserModel } from 'src/app/core/interfaces';
import { RestApiService, AuthenticationService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'confirm-cancel-with-employee-id',
  templateUrl: './confirm-cancel-with-employee-id.component.html',
  styleUrl: './confirm-cancel-with-employee-id.component.scss'
})
export class ConfirmCancelWithEmployeeIdComponent {
  public form: FormGroup;
  public user: UserModel | undefined;
  @Input() title: string ='';
  @Input() onSubmitted!: () => void;
  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private authenticationService: AuthenticationService) {
    this.form = this.formBuilder.group({
      username: new FormControl({ value: "", disabled: true }, Validators.required),
    });
    this.authenticationService.user?.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
    if (this.user) {
      this.form.get('username')?.setValue(this.user.username);
    }
  }
  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

  onCancelPassage() {
    Promise.resolve(this.onSubmitted()).then(() => {
      this.ngbActiveModal.close(true);
    });
  }
}
