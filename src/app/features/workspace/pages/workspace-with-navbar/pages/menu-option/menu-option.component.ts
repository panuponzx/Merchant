import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrl: './menu-option.component.scss'
})
export class MenuOptionComponent {

  constructor(
    private router: Router
  ) {
    addEventListener('dblclick', () => {
      this.router.navigate(['work-space/user-info/1']);
    })
  }
 
}
