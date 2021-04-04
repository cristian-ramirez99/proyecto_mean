import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

const VISA: string = "visa";
const MASTERCARD: string = "mastercard";

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['../../../assets/css/pages/tarjeta-credito.css', './tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  public tipos = [VISA, MASTERCARD];


  public esVisa: boolean = true;

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
  onChangeTipo() {
    const { tipo } = this.tarjetaCreditoForm.value;

    if (tipo === VISA) {
      this.esVisa = true;
    } else if (tipo === MASTERCARD) {
      this.esVisa = false;
    }
  }
}