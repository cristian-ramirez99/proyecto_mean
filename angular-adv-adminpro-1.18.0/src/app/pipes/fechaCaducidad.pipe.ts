import { Pipe, PipeTransform } from '@angular/core';

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
