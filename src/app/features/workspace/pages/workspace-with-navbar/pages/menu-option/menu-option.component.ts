import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../../../../../core/interfaces';
import { AuthenticationService } from '../../../../../../core/services';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrl: './menu-option.component.scss'
})
export class MenuOptionComponent {

  public user: UserModel | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user?.subscribe(x => this.user = x);
  }

  searchUser() {
    this.router.navigate(['work-space/search-user']);
  }

  addUser() {
    this.router.navigate(['work-space/add-user']);
  }

  management() {
    this.router.navigate(['work-space/approval-management/waiting-for-approval']);
  }

  superAdmin() {
    this.router.navigate(['work-space/menu-option-super-admin']);
  }

}
