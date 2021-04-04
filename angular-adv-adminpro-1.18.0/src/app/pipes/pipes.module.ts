import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { OcultarNumeroPipe } from './ocultar-numero.pipe';
import { FechaCaducidadPipe } from './fechaCaducidad.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    OcultarNumeroPipe,
    FechaCaducidadPipe,
  ],
  exports: [
    ImagenPipe,
    OcultarNumeroPipe,
    FechaCaducidadPipe
  ],
})
export class PipesModule { }
