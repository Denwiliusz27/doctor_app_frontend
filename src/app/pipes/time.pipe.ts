import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customPipeTime'})
export class CustomPipeTime implements PipeTransform {
  transform(value: string): string {
    const time = value.split(' ')[1];
    return time.substring(0, 5);
  }
}
