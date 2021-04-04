import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.mode';

@Injectable({
  providedIn: 'root'
})
export class ModalTarjetaCreditoService {

  constructor() { }

  private _ocultarModal: boolean = true;
  public pedido: Pedido;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(pedido: Pedido) {
    this.pedido = pedido;

    this._ocultarModal = false;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}
