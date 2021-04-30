import { Component, OnInit } from '@angular/core';
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
      this.pedido = this.modalTarjetaCreditoService.pedido;

      if (this.pedido) {
        this.primeraVez = false;
        this.cargarTarjetaCredito();
      }
    }
  }

  cargarTarjetaCredito() {
    this.tarjetaCredito = this.usuarioService.tarjetaCredito;

    if (this.tarjetaCredito != null) {
      this.existeTarjetaCredito = true;
    }
    //Es necesario para que sea tipo Date
    this.tarjetaCredito.fechaCaducidad = new Date(this.tarjetaCredito.fechaCaducidad);

  }

  hacerPedido() {
    //Control de errores
    if (this.isFechaCaducidadValida()) {
      Swal.fire('Error', 'Vaya, parece que la fecha de caducidad de la tarjeta expiró', 'error');
      return;
    }
    this.pedido.estado = 'proceso';
    this.pedido.fecha = new Date();
    this.pedido.formaPago = 'tarjeta';
    console.log(this.pedido);

    this.pedidoService.actualizarPedido(this.pedido)
      .subscribe(resp => {
        Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
          then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/dashboard");
            }
          });
      });
  }
  isFechaCaducidadValida() {
    const fechaActual = new Date();
    return fechaActual > this.tarjetaCredito.fechaCaducidad;
  }
  cambiarVisibilidadTarjeta() {
    this.mostrarTarjeta = !this.mostrarTarjeta;
  }
  cerrarModal() {
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalTarjetaCreditoService.cerrarModal();
  }
}
