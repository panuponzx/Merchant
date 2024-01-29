import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.removeNgVersion();
  }

  removeNgVersion() {
    this.elementRef.nativeElement.removeAttribute("ng-version");
  }
}
