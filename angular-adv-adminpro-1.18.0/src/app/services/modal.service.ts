import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.mode';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  public pedido: Pedido;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(pedido: Pedido) {
    this.pedido = pedido;
    this._ocultarModal = false;
    console.log("Estoy en modalService");
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }

}
