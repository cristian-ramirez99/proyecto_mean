import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito.model';
import { TarjetaCreditoService } from 'src/app/services/tarjeta-credito.service';
import Swal from 'sweetalert2';

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

  public tipos = ["VISA", "MASTERCARD"];
  public meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: number[] = [];

  public tarjetaCredito: TarjetaCredito = new TarjetaCredito('VISA', 'Jhon Doe', '**** **** **** ****', new Date(), '123', '');

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
  private formSumbitted: boolean = false;
  private isTarjetaCreditoCreada: boolean = false;

  constructor(public fb: FormBuilder,
    private tarjetaCreditoService: TarjetaCreditoService) { }

  ngOnInit(): void {
    this.cargarCincoYearsDesdeElActual()
    this.cargarTarjetaCredito();
  }
  cargarTarjetaCredito() {
    this.tarjetaCreditoService.cargarTarjetaCredito()
      .subscribe((tarjeta: TarjetaCredito) => {
        this.tarjetaCredito = tarjeta;
        this.isTarjetaCreditoCreada = true;

        this.tarjetaCreditoForm.setValue({
          tipo: tarjeta.tipo,
          titular: tarjeta.titular,
          numero: tarjeta.numero,
          mes: tarjeta.fechaCaducidad.getDate(),
          year: tarjeta.fechaCaducidad.getFullYear(),
          cvv: tarjeta.cvv,
        })

      });
    //Borrar !!!
    this.isTarjetaCreditoCreada = true;
    const tarjeta = new TarjetaCredito('MASTERCARD', 'Manolo', '1234567891234567', new Date(), '123', 'djhsa123');
    this.tarjetaCredito = tarjeta;

    this.tarjetaCreditoForm.setValue({
      tipo: tarjeta.tipo,
      titular: tarjeta.titular,
      numero: tarjeta.numero,
      mes: tarjeta.fechaCaducidad.getDate() - 1,
      year: tarjeta.fechaCaducidad.getFullYear(),
      cvv: tarjeta.cvv,
    })
  }
  guardarTarjetaCredito() {
    this.formSumbitted = true;
    console.log(this.tarjetaCreditoForm.value);

    if (this.campoNoEsNumero('numero')) {
      return false;
    }

    if (this.campoNoEsNumero('cvv')) {
      return false;
    }
    if (this.titularNoValido()) {
      return false;
    }

    //Modificar tarjeta
    if (this.isTarjetaCreditoCreada) {
      this.tarjetaCreditoService.modificarTarjetaCredito(this.tarjetaCreditoForm.value)
        .subscribe(resp => {
          Swal.fire('Actualizado', 'Tarjeta atualizada correctamente', 'success');

        });
      //Borrar !!!
      Swal.fire('Actualizado', 'Tarjeta atualizada correctamente', 'success');

      //Crear tarjeta
    } else {
      this.tarjetaCreditoService.crearTarjetaCredito(this.tarjetaCreditoForm.value)
        .subscribe(resp => {
          Swal.fire('Creado', 'Tarjeta creada correctamente', 'success');
          this.isTarjetaCreditoCreada = true;
        });
      //Borrar !!!
      Swal.fire('Creado', 'Tarjeta creada correctamente', 'success');
      this.isTarjetaCreditoCreada = true;


    }
  }

  cargarCincoYearsDesdeElActual() {
    const añoActual = new Date().getFullYear();

    for (let i = 0; this.tiempoCaducidadTarjetaEnYears > i; i++) {
      this.years[i] = añoActual + i;
    }
  }
  //Comprueba si solo contiene letras
  titularNoValido(): boolean {
    const { titular } = this.tarjetaCreditoForm.value;

    return this.formSumbitted && !/^[A-Za-z]+$/.test(titular);

  }

  campoNoEsNumero(campo: string): boolean {
    const campoValue = this.tarjetaCreditoForm.get(campo).value;

    return this.formSumbitted && isNaN(Number(campoValue));
  }

  onChangeTipo() {
    const { tipo } = this.tarjetaCreditoForm.value;
    this.tarjetaCredito.tipo = tipo;
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
