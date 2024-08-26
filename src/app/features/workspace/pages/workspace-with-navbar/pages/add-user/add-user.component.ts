import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {


  constructor(private router: Router) {

  }

  onAddPersonalUser() {
    this.router.navigate(['work-space/add-user/personal']);
  }

  onAddJuristicUser() {
    this.router.navigate(['work-space/add-user/juristic']);
  }

  onBackToHome() {
    this.router.navigate(['work-space/menu-option']);
  }


}
