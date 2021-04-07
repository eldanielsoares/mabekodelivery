import { Pipe, PipeTransform } from '@angular/core';
import { Adicionais } from 'src/app/interfaces/adicionais';

@Pipe({
  name: 'ads'
})
export class AdicionalPipePipe implements PipeTransform {

  transform(value: any[], ...args: Adicionais[]): any {
    return value.filter((item)=> item.categoria == args);
  }

}
