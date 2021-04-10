import { Component, OnInit } from '@angular/core';
import { TarjetaCreditoService } from '../../services/tarjeta-credito.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido.mode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-tarjeta-credito',
  templateUrl: './modal-tarjeta-credito.component.html',
  styleUrls: ['./modal-tarjeta-credito.component.css']
})
export class ModalTarjetaCreditoComponent implements OnInit {

  public tarjetaCredito: TarjetaCredito;

  public primeraVez: boolean = true;
  public mostrarTarjeta: boolean = false;
  public pedido: Pedido;

  constructor(public modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private tarjetaCreditoService: TarjetaCreditoService,
    private pedidoService: PedidoService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.primeraVez) {
      this.primeraVez = false;
      this.pedido = this.modalTarjetaCreditoService.pedido;
      this.cargarTarjetaCredito();

      //Borra esto !!!!!!!!
      this.pedido._id = "dasjidjaso";
    }
  }

  cargarTarjetaCredito() {
    this.tarjetaCreditoService.cargarTarjetaCredito()
      .subscribe(tarjeta => {
        this.tarjetaCredito = tarjeta;
      });
    //Borrar !!!
    this.tarjetaCredito = new TarjetaCredito('VISA', "El pana manuel", "1234567891234567", new Date(2022, 8, 12), "123", "e1g2h12fgvd");
  }

  hacerPedido() {
    //Control de errores
    if (this.isFechaCaducidadValida()) {
      Swal.fire('Error', 'Vaya, parece que la fecha de caducidad de la tarjeta expiró', 'error');
      return;
    }

    this.pedidoService.actualizarPedido(this.pedido)
      .subscribe(resp => {
        Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
          then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/dashboard");
            }
          });
      });

    //Borrar !!!
    Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
      then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/dashboard");
        }
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
