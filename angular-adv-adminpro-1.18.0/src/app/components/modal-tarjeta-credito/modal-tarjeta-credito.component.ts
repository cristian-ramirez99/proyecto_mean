import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TarjetaCreditoService } from '../../services/tarjeta-credito.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido.mode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-tarjeta-credito',
  templateUrl: './modal-tarjeta-credito.component.html',
  styleUrls: ['./modal-tarjeta-credito.component.css']
})
export class ModalTarjetaCreditoComponent implements OnInit {

  public tarjetaCredito: TarjetaCredito = new TarjetaCredito('VISA', 'manolo', '1234567891234567', new Date(), '123', '');
  public existeTarjetaCredito: boolean = false;
  public primeraVez: boolean = true;
  public mostrarTarjeta: boolean = false;
  public pedido: Pedido;

  constructor(public modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.primeraVez) {
      //Obtiene el pedido temporal
      this.pedido = this.modalTarjetaCreditoService.pedido;

      if (this.pedido) {
        this.primeraVez = false;
        this.cargarTarjetaCredito();
      }
    }
  }

  /*Obtiene la tarjeta de credito si existe.*/
  cargarTarjetaCredito() {
    this.tarjetaCredito = this.usuarioService.tarjetaCredito;

    if (this.tarjetaCredito != null) {
      this.existeTarjetaCredito = true;
    }
    //Es necesario para que sea tipo Date
    this.tarjetaCredito.fechaCaducidad = new Date(this.tarjetaCredito.fechaCaducidad);

  }
  /*Comrpueba que la fecha de caducidad no este caducada y si todo ok hace peticion http para actualizar el pedido*/
  hacerPedido() {
    //Control de errores
    if (this.isFechaCaducidadValida()) {
      Swal.fire('Error', 'Vaya, parece que la fecha de caducidad de la tarjeta expiró', 'error');
      return;
    }
    //Actualizamos datos antes de enviar los datos al backend
    this.pedido.estado = 'proceso';
    this.pedido.fecha = new Date();
    this.pedido.formaPago = 'tarjeta';

    this.pedidoService.actualizarPedido(this.pedido)
      .subscribe(resp => {
        //Mostramos mensaje de todo ok
        Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
          then((result) => {
            if (result.isConfirmed) {
              //Navega a Dashboard
              this.router.navigateByUrl("/dashboard");
            }
          });
      });
  }
  //Comprobamos si la fecha de caducidad es valida
  isFechaCaducidadValida() {
    const fechaActual = new Date();
    return fechaActual > this.tarjetaCredito.fechaCaducidad;
  }
  //Mostramos o ocultamos información de la tarjeta de crédito
  cambiarVisibilidadTarjeta() {
    this.mostrarTarjeta = !this.mostrarTarjeta;
    let substitulo;

    if (this.mostrarTarjeta) {
      substitulo = "Haz click para ocultar";
    } else {
      substitulo = "Haz click para ver más";
    }
    document.getElementById("substitulo").innerHTML = substitulo;
    document.getElementById("icono").className = "fa fa-caret-up";

  }
  //Cerra modal
  cerrarModal() {
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalTarjetaCreditoService.cerrarModal();
  }
}
