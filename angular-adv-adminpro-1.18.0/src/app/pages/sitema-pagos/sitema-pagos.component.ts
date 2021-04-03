import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sitema-pagos',
  templateUrl: './sitema-pagos.component.html',
  styleUrls: ['./sitema-pagos.component.css']
})
export class SitemaPagosComponent implements OnInit {

  public pedido: Pedido;

  constructor(private pedidoService: PedidoService,
    private modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarPedidoTemp();
  }

  cargarPedidoTemp() {
    this.pedidoService.cargarPedidoTemp()
      .subscribe(pedido => {
        this.pedido = pedido;
      });
    //Borrar !!!
    let productos: Producto[] = [];
    productos.push(new Producto('ordenador', 'bobo', 40, 'no-image', new TipoProducto('pc', 'mu bonito'), '1', 2));
    productos.push(new Producto('ordenador', 'bobo', 40, 'no-image', new TipoProducto('pc', 'mu bonito'), '1', 2));

    this.pedido = new Pedido('temporal', productos);
  }
  hacerPedido() {
    this.pedido.fecha = new Date();
    this.pedido.estado = 'proceso';

    this.pedidoService.hacerPedido(this.pedido)
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
    this.modalTarjetaCreditoService.abrirModal(63);
  }

  alertConfirmarContrareembolso() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Seguro que quieres pagar contrareembolso?",
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
}
