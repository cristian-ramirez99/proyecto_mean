import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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


  public tarjetaCreditoForm = this.fb.group(
    {
      tipo: ['', Validators.required],
      titular: ['', Validators.required],
      numero: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      cvv: ['', Validators.required],
    }
  );
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {

  }
  guardarTarjetaCredito() {
    console.log("Guardando tarjeta");
  }
  abrirForm() {
    this.isFormActivado = !this.isFormActivado;
  }
  girarTarjeta() {
    this.isTarjetaGirada = !this.isTarjetaGirada;
  }
}