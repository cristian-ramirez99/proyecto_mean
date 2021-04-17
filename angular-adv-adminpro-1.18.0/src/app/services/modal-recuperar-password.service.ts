import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalRecuperarPasswordService {
  private _ocultarModal: boolean = true;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }

}