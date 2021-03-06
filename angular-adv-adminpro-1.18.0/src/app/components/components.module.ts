import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalComponent } from './modal/modal.component';
import { ModalActualizarPasswordComponent } from './modal-actualizar-password/modal-actualizar-password.component';
import { ModalTarjetaCreditoComponent } from './modal-tarjeta-credito/modal-tarjeta-credito.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ModalRecuperarPasswordComponent } from './modal-recuperar-password/modal-recuperar-password.component';



@NgModule({
  declarations: [
    DonaComponent,
    ModalImagenComponent,
    ModalComponent,
    ModalActualizarPasswordComponent,
    ModalTarjetaCreditoComponent,
    ModalRecuperarPasswordComponent,
  ],
  exports: [
    DonaComponent,
    ModalImagenComponent,
    ModalComponent,
    ModalActualizarPasswordComponent,
    ModalTarjetaCreditoComponent,
    ModalRecuperarPasswordComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
