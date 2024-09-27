import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../../core/services';
import { UserModel } from '../../../../../../core/interfaces';

@Component({
  selector: 'app-menu-option-super-admin',
  templateUrl: './menu-option-super-admin.component.html',
  styleUrl: './menu-option-super-admin.component.scss'
})
export class MenuOptionSuperAdminComponent {

  public user: UserModel | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user?.subscribe(x => this.user = x);
  }


  searchType9() {
    // this.router.navigate(['work-space/search-user']);
  }
  searchMerchant() {
    this.router.navigate(['work-space/search-merchant-customer']);
  }
  testCardManagement() {
    this.router.navigate(['work-space/test-card-registration']);
  }
  type9Management() {
    this.router.navigate(['work-space/type-9-management/wallet-type-9-management']);
  }
  addCarType9() {
    this.router.navigate(['work-space/add-car-type9']);
  }

  onBackToHome() {
    this.router.navigate(['work-space/menu-option']);
  }

}
