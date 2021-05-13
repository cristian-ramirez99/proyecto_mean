import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundTwoDecimals'
})
export class RoundTwoDecimals implements PipeTransform {

    transform(numero: number): string {
        const roundNumber = Math.round((numero + Number.EPSILON) * 100) / 100;
        return roundNumber.toFixed(2);
    }

}
