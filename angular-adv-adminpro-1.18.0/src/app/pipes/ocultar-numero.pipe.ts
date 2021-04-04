import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
    name: 'ocultarNumero'
})
export class OcultarNumeroPipe implements PipeTransform {

    transform(numero: string): string {
        const inicio = numero.slice(0, 6);
        const mitad = "******";
        const final = numero.slice(-4);

        return ''.concat(inicio, mitad, final);
    }

}
