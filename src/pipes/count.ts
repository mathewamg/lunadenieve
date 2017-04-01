import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the Count pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'count',
  pure: false
})
@Injectable()
export class Count implements PipeTransform {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    console.log("length: " + value);
    return value;
  }
}
