import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-svg',
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss'
})
export class SvgComponent implements OnInit {
  @HostBinding('style.-webkit-mask-image') private _path!: string;

  @Input() public path: string | undefined;
  @Input() public size: 's' | 'm' | 'l' | 'xl' | string = 'm';
  @Input() public color: string | null = null;

  ngOnInit(): void {
    if (this.path) {
      this._path = `url("${this.path}")`;
    }
  }

  getSize(): string {
    let dimension: string;
    switch (this.size) {
      case 's':
        dimension = '15px';
        break;
      case 'm':
        dimension = '24px';
        break;
      case 'l':
        dimension = '25px';
        break;
      case 'xl':
        dimension = '30px';
        break;
      default:
        dimension = this.size;
        break;
    }
    return dimension;
  }

}
