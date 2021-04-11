import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Comision del 3%
const comisionContrarrembolso: number = 0.03;

//Comision del 20%
const comisionEnvio: number = 0.2;
const precioMinimoSinComisionDeEnvio: number = 20;

@Component({
  selector: 'app-sitema-pagos',
  templateUrl: './sitema-pagos.component.html',
  styleUrls: ['./sitema-pagos.component.css']
})
export class SitemaPagosComponent implements OnInit {

  public pedido: Pedido;
  public idPedido: string;

  constructor(private pedidoService: PedidoService,
    private modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  hacerPedido() {
    this.pedido.fecha = new Date();
    this.pedido.estado = 'proceso';

    this.pedidoService.actualizarPedido(this.pedido)
      .subscribe((resp: any) => {
        Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
          then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/dashboard");
            }
          })
      });
    //Borrar !!!
    Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
      then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/dashboard");
        }
      })
  }
  abrirModal() {
    this.modalTarjetaCreditoService.abrirModal(this.pedido);
  }

  alertConfirmarContrarrembolso() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Seguro que quieres pagar contrarrembolso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#555555',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar forma de pago',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.hacerPedido();
      }
    })
  }

  hayCosteDeEnvio(): boolean {
    return this.pedido.precio < precioMinimoSinComisionDeEnvio;
  }

  precioEnvio(): number {
    return this.pedido.precio * comisionEnvio;
  }

  precioContrarrembolso(): number {
    return this.pedido.precio * comisionContrarrembolso;
  }
}
