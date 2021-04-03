import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['../../../assets/css/pages/tarjeta-credito.css', './tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  btnAbrirFormulario = document.getElementById('btn-abrir-formulario');
  formulario = document.getElementById('formulario-tarjeta');

  isFormActivado: boolean = false;
  isTarjetaGirada: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
  abrirForm() {
    this.isFormActivado = !this.isFormActivado;
  }
  girarTarjeta() {
    this.isTarjetaGirada = !this.isTarjetaGirada;
  }
}