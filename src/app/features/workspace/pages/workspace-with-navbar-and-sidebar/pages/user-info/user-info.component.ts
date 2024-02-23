import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { RestApiService } from '../../../../../../core/services';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {

  private customerId: string | null = null;

  public activeTab: string | null;

  constructor(
    private restApiService: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe(() => this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab'));
  }

  ngOnInit(): void {
    if (this.customerId)  {
      this.getCustomerSummary();
    }
  }

  getCustomerSummary() {
    const mockupData = {
      id: this.customerId,
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    this.restApiService
      .post('get-summary', mockupData)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/user-info/' + event.nextId + '/' + this.customerId
    this.router.navigate([url], { replaceUrl: true });
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

}
