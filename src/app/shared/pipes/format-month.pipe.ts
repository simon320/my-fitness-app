import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatMonth'
})
export class FormatMonthPipe implements PipeTransform {
  transform(value: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[value] || '';
  }
}