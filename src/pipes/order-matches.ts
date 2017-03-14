import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'order-matches',
  pure: false
})
export class OrderMatches implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}
