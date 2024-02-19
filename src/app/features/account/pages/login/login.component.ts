import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // เพิ่ม Router มาใน import
import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  onLogin(): void {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;

      this.authenticationService.onLogin({
        username: username,
        token: '1234',
        role: username
      });
    }
  }
}
