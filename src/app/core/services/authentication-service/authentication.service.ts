import { Injectable } from '@angular/core';
import { UtilitiesService } from '../utilities-service/utilities.service';
import { UserModel } from '../../interfaces';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<UserModel | undefined> | undefined = undefined;
  public user: Observable<UserModel | undefined> | undefined = undefined;

  constructor(
    private utilitiesService: UtilitiesService,
    private router: Router
  ) {
    this.initAuthentication();
  }

  initAuthentication() {
    const encryptUser = localStorage.getItem('user');
    const decryptUser = this.utilitiesService.decryptData(encryptUser, environment.aesSecretKey);
    this.userSubject = new BehaviorSubject<UserModel | undefined>(decryptUser);
    this.user = this.userSubject.asObservable();
  }

  onLogin(user: UserModel) {
    this.setUserValue(user);
    this.router.navigate(['work-space/menu-option']);
  }

  getUserValue(): UserModel | undefined {
    if (this.userSubject?.value) {
      return this.userSubject.value;
    } else {
      return undefined;
    }
  }

  setUserValue(user: UserModel) {
    const encryptedUser = this.utilitiesService.encryptData(user, environment.aesSecretKey);
    if (encryptedUser) {
      localStorage.setItem('user', encryptedUser);
      if (this.userSubject) {
        this.userSubject.next(user);
      }
    }
  }

  removeUserValue() {
    localStorage.removeItem('user');
    if(this.userSubject) {
      this.userSubject.next(undefined);
    }
  }

  logout(returnUrl?: string) {
    this.removeUserValue();
    if(returnUrl) {
      this.router.navigate(['account/login'], { queryParams: { returnUrl: this.router.url } })
    } else {
      this.router.navigateByUrl('account/login');
    }
  }

}
