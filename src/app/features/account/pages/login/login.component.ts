import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // เพิ่ม Router มาใน import

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
    private router: Router // เพิ่ม Router ไปยัง constructor
  ) {
 
  }

  onLogin(): void {
    if (this.form.valid) {
      const enteredUsername = this.form.value.username;
      const enteredPassword = this.form.value.password;

      // กระทำตามลอจิกการตรวจสอบข้อมูลที่นี่
      if (enteredUsername === 'admin' && enteredPassword === 'admin') {
        console.log('Login successful');
        this.router.navigate(['/work-space/menu-option']); // เปลี่ยนเส้นทางไปยังหน้า 'home'
      } else {
        console.log('Login failed. Invalid credentials.');
      }
      if  (enteredUsername === 'superadmin' && enteredPassword === 'superadmin') {
        console.log('Login successful');
        this.router.navigate(['/work-space/menu-option']); // เปลี่ยนเส้นทางไปยังหน้า 'home'
      } else {
        console.log('Login failed. Invalid credentials.');
    } 
    }
  }
}
