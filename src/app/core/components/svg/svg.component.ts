import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-svg',
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss'
})
export class SvgComponent implements OnInit {

  @HostBinding('style.-webkit-mask-image') private _path!: string;

  // @HostBinding('style.width') private _width!: string;

  @Input() public path: string | undefined;
  @Input() public size: 'sm' | 'md' | 'lg' | 'xl' = 'sm'; // สร้าง Input property สำหรับ size
  @Input() public color: string = '#ffffff';

  public dimension: number = 20;

  constructor() {

  }

  ngOnInit(): void {
    if (this.path) {
      this._path = `url("${ this.path} ")`;
      // this._width = this.getSize()+'px';
    }
  }

  ngAfterViewInit(): void {
  }

  private getSize(): number {
    switch (this.size) {
      case 'sm':
        return 15;
      case 'md':
        return 20;
      case 'lg':
        return 25;
      case 'xl':
        return 30;
      default:
        return 20;
    }
  }

}
