import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(id: string) {
    this._ocultarModal = false;
    console.log("Estoy en modalService");
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }

}
