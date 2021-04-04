import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
    name: 'fecha'
})
export class FechaCaducidadPipe implements PipeTransform {

    transform(numero: number, isMonth: boolean): any {
        if (isMonth) {
            numero += 1;
        }
        return numero < 10 ? '0' + numero : numero;
    }

}
