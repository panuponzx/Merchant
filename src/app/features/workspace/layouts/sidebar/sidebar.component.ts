import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, Scroll } from '@angular/router';
import { CustomRouteModel, UserModel } from '../../../../core/interfaces';
import { AuthenticationService } from '../../../../core/services';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public user: UserModel | undefined;

  public routes: CustomRouteModel[] | undefined = [];

  public customerId: string | undefined;
  public activeTab: string | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.authenticationService.user?.subscribe(x => this.user = x);
    this.routes = this.activatedRoute.routeConfig?.children ? [...this.activatedRoute.routeConfig.children].filter((x: CustomRouteModel) => x.data?.is_sidebar) : [];
    this.customerId = this.getCustomerId();
  }

  getCustomerId(): string {
    const mapUrl = this.router.url.split('/');
    return mapUrl[mapUrl.length - 1];
  }

  getActiveRoute(routeConfig: CustomRouteModel) {
    const url = this.router.url
    const defaultPath = routeConfig.data?.default_path;
    if (defaultPath) {
      return url.includes(defaultPath);
    } else {
      if (url === routeConfig.path) {
        return true;
      } else {
        return false;
      }
    }
  }

}
