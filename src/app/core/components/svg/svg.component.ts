import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-svg',
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss'
})
export class SvgComponent implements OnInit {
  @HostBinding('style.-webkit-mask-image') private _path!: string;

  @Input() public path: string | undefined;
  @Input() public size: 's' | 'm' | 'l' | 'xl' = 'm';
  @Input() public color: 'white' | 'blue' = 'white'; // Fixed typo here

  ngOnInit(): void {
    if (this.path) {
      this._path = `url("${this.path}")`;
    }
  }

  getColor(): string {
    let colorcode: string;
    switch (this.color) {
      case 'white':
        colorcode = '#FFFFFF';
        break;
      case 'blue':
        colorcode = '#2255CE';
        break; // Added missing break statement
      default:
        colorcode = '#FFFFFF'; // Default to white if no match
        break;
    }
    return colorcode;
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
        dimension = '20px';
        break;
    }
    return dimension;
  }

}
