import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { OcultarNumeroPipe } from './ocultar-numero.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    OcultarNumeroPipe
  ],
  exports: [
    ImagenPipe,
    OcultarNumeroPipe
  ],
})
export class PipesModule { }
