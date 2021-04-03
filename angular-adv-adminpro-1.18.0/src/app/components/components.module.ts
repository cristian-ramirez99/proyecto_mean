import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalComponent } from './modal/modal.component';
import { ModalActualizarPasswordComponent } from './modal-actualizar-password/modal-actualizar-password.component';
import { ModalTarjetaCreditoComponent } from './modal-tarjeta-credito/modal-tarjeta-credito.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalComponent,
    ModalActualizarPasswordComponent,
    ModalTarjetaCreditoComponent,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalComponent,
    ModalActualizarPasswordComponent,
    ModalTarjetaCreditoComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
