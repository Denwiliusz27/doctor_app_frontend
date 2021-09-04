import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customPipeTime'})
export class CustomPipeTime implements PipeTransform {
  transform(value: string): string {
    return value.split('T')[1].substring(0, 5);
  }
}
