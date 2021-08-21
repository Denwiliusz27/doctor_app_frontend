import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customPipeDate'})
export class CustomPipeDate implements PipeTransform {
  transform(value: string): string {
    const splitted = value.split('-' );
    return splitted[2] + '.' + splitted[1];
  }
}
