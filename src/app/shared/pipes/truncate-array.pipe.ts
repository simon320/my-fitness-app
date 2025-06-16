import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateArray'
})
export class TruncateArrayPipe implements PipeTransform {
  transform(value: string[] | undefined, limit: number = 18): string {
    if (!value) 
      return '';

    let formatArray: string = '';
    value.forEach( (currentValue, i) => {
      
      if(value.length > i+1) 
        formatArray += currentValue + ', ';
      
    })

    if(formatArray) 
      formatArray = formatArray.slice(0, formatArray.length-2).concat('.');
    

    return value.length > limit ? formatArray.substring(0, limit) + '...' : formatArray;
    
  }
}
