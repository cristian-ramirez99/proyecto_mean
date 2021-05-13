import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { OcultarNumeroPipe } from './ocultar-numero.pipe';
import { FechaCaducidadPipe } from './fechaCaducidad.pipe';
import { RoundTwoDecimals } from './roundTwoDecimals.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    OcultarNumeroPipe,
    FechaCaducidadPipe,
    RoundTwoDecimals
  ],
  exports: [
    ImagenPipe,
    OcultarNumeroPipe,
    FechaCaducidadPipe,
    RoundTwoDecimals

  ],
})
export class PipesModule { }
