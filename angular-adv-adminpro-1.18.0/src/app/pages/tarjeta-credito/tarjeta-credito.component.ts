import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TarjetaCreditoService } from 'src/app/services/tarjeta-credito.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
    private tarjetaCreditoService: TarjetaCreditoService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarCincoYearsDesdeElActual()

    //Comprobamos si existe tarjetaCredito ya creada
    if (this.usuarioService.tarjetaCredito != null) {
      this.tarjetaCredito = this.usuarioService.tarjetaCredito;
      this.isTarjetaCreditoCreada = true;

      //Es necesario para que sea tipo Date
      this.tarjetaCredito.fechaCaducidad = new Date(this.tarjetaCredito.fechaCaducidad);

      //Actualizamos el value de los inputs
      this.tarjetaCreditoForm.setValue({
        tipo: this.tarjetaCredito.tipo,
        titular: this.tarjetaCredito.titular,
        numero: this.tarjetaCredito.numero,
        mes: this.tarjetaCredito.fechaCaducidad.getMonth() + 1,
        year: this.tarjetaCredito.fechaCaducidad.getFullYear(),
        cvv: this.tarjetaCredito.cvv,
      });
    }
  }

  async guardarTarjetaCredito() {
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

    const { tipo, titular, numero, cvv } = this.tarjetaCreditoForm.value;


    //Modificar tarjeta
    if (this.isTarjetaCreditoCreada) {
      this.tarjetaCredito = new TarjetaCredito(tipo, titular, numero, this.getFechaCaducidad(), cvv, this.tarjetaCredito._id)

      this.tarjetaCreditoService.modificarTarjetaCredito(this.tarjetaCredito)
        .subscribe(resp => {
          Swal.fire('Actualizado', 'Tarjeta atualizada correctamente', 'success');
        });

      //Crear tarjeta
    } else {
      this.tarjetaCredito = new TarjetaCredito(tipo, titular, numero, this.getFechaCaducidad(), cvv)

      await this.tarjetaCreditoService.crearTarjetaCredito(this.tarjetaCredito)
        .toPromise()
        .then((resp: { ok: boolean, tarjetaCredito: TarjetaCredito }) => {
          Swal.fire('Creado', 'Tarjeta creada correctamente', 'success');
          this.tarjetaCredito._id = resp.tarjetaCredito._id;
          this.isTarjetaCreditoCreada = true;
        })
      //Hacemos peticion para añadir al usuario la tarjetaCredito
      this.actualizarUsuario();
    }

  }

  //Peticion que añade al usuario la tarjeta
  actualizarUsuario() {
    const data = {
      tarjetaCredito: this.tarjetaCredito._id,
    }

    const uid = this.usuarioService.uid;

    this.usuarioService.actualizarUsuario(data, uid)
      .subscribe((resp: { ok: Boolean, usuario: Usuario }) => {
        console.log(resp);
        this.usuarioService.setTarjetaCredito(resp.usuario.tarjetaCredito);
      })
  }

  getFechaCaducidad(): Date {
    const { mes, year } = this.tarjetaCreditoForm.value;

    //Ultimo dia del mes es day = 0
    const fechaCaducidad = new Date(year, mes, 0);

    return fechaCaducidad;
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
