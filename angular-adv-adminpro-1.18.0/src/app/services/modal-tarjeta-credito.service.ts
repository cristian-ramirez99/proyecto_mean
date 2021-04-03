import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalTarjetaCreditoService {

  constructor() { }

  private _ocultarModal: boolean = true;
  public precioPedido: number;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(precioPedido: number) {
    this.precioPedido = precioPedido;

    this._ocultarModal = false;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}
