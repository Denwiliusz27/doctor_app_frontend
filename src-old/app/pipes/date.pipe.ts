import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customPipeDate'})
export class CustomPipeDate implements PipeTransform {
  transform(value: string): string {;
    return value.split('T')[0].substring(5);
  }
}
