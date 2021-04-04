import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

const VISA: string = "visa";
const MASTERCARD: string = "mastercard";

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['../../../assets/css/pages/tarjeta-credito.css', './tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  @ViewChild('spanMes') spanMes: ElementRef;
  @ViewChild('spanYear') spanYear: ElementRef;
  @ViewChild('pNumero') pNumero: ElementRef;
  @ViewChild('pTitular') pTitular: ElementRef;

  public tipos = [VISA, MASTERCARD];
  public meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: number[] = [];

  public esVisa: boolean = true;

  public tarjetaCreditoForm = this.fb.group(
    {
      tipo: ['', Validators.required],
      titular: ['', Validators.required],
      numero: ['', Validators.required],
      mes: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.required],
    }
  );

  //Tarda 5 años en caducar la tarjeta
  private tiempoCaducidadTarjetaEnYears: number = 5;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    const añoActual = new Date().getFullYear();

    for (let i = 0; this.tiempoCaducidadTarjetaEnYears > i; i++) {
      this.years[i] = añoActual + i;
    }
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
  onChangeMes() {
    const { mes } = this.tarjetaCreditoForm.value;

    this.spanMes.nativeElement.innerHTML = mes;
  }
  onChangeYear() {
    const { year } = this.tarjetaCreditoForm.value;

    this.spanYear.nativeElement.innerHTML = year;
  }
  onChangeNumero() {
    const { numero } = this.tarjetaCreditoForm.value;
    this.pNumero.nativeElement.innerHTML = numero;
  }
  onChangeTitular() {
    const { titular } = this.tarjetaCreditoForm.value;
    this.pTitular.nativeElement.innerHTML = titular;
  }
}