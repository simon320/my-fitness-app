import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatPercentage'
})
export class FormatPercentagePipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number' || isNaN(value)) 
      return '0%';

    const shortValue = value.toString().split('.')[0];
    return `${shortValue}%`;
  }
}