import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;
    return value.split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
      .join(' ');
  }

}
