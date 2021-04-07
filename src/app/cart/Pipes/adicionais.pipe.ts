import { Pipe, PipeTransform } from '@angular/core';
import { Adicionais } from 'src/app/interfaces/adicionais';

@Pipe({
  name: 'adicionais'
})
export class AdicionaisPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    return value.filter((item)=> item.categoria == args)
  }

}
