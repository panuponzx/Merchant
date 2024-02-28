import { Pipe, PipeTransform } from '@angular/core';
import { IconModel } from '../types';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  private iconList: { iconName: IconModel, path: string }[] = [
    { iconName: 'customer-type-1', path: 'assets/images/icons/user_type_user.svg' },
    { iconName: 'customer-type-2', path: 'assets/images/icons/user_type_international.svg' },
    { iconName: 'customer-type-3', path: 'assets/images/icons/user_type_juristic.svg' }
  ];

  transform(iconName: IconModel | null | string): string | null {
    const icon = this.iconList.find(x => x.iconName === iconName)
    if (icon) {
      return icon.path;
    } else {
      return null;
    }

  }



}
