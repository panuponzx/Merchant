import { Component } from '@angular/core';
import { UserModel } from '../../../../core/interfaces';
import { AuthenticationService } from '../../../../core/services';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public user: UserModel | undefined;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user?.subscribe(x => this.user = x);
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
