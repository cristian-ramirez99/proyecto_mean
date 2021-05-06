import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';

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
  public lineaPedidos: LineaPedido[] = [];
  public precio: number;

  constructor(private pedidoService: PedidoService,
    private modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private usuarioService: UsuarioService,
    private lineaPedidoService: LineaPedidoService,
    private router: Router) { }


  async ngOnInit(): Promise<void> {
    const uid = this.usuarioService.uid;

    //Hace peticion http para obtner el pedidoTemporal del usuario
    await this.pedidoService.cargarPedidoTemp(uid)
      .toPromise()
      .then(pedidoTemp => {

        //Si no existe pedidoTemporal
        if (pedidoTemp == null) {
          //Navega a dashboard
          this.router.navigateByUrl("dashboard");
        }
        this.pedido = pedidoTemp;
      })

    //Hace peticion http para obterner todas las lineaPedidos
    await this.lineaPedidoService.cargarLineaPedidos(this.pedido._id)
      .toPromise()
      .then((lineaPedidos: LineaPedido[]) => {

        //Si no hay lineaPedidos
        if (lineaPedidos.length == 0) {
          //Navega a dashboard
          this.router.navigateByUrl("dashboard");
        }
        this.lineaPedidos = lineaPedidos;
      })

    this.precio = this.getPrecioSinComisiones();
  }

  /*Hace peticion http para actualizar el pedidoTemp*/
  hacerPedido() {
    this.pedido.fecha = new Date();
    this.pedido.estado = 'proceso';
    this.pedido.formaPago = 'Contrarrembolso';

    this.pedido.precio = this.precioContrarrembolso() + this.precio;

    if (this.hayCosteDeEnvio()) {
      this.pedido.precio += this.precioEnvio();
    }

    this.pedidoService.actualizarPedido(this.pedido)
      .subscribe((resp: any) => {
        //Se muestra mensaje conforme se hizo el pedido correctamente
        Swal.fire('Pedido realizado', 'Su pedido le llegara en 7 días hábiles', 'success').
          then((result) => {
            if (result.isConfirmed) {
              //Navega a dashboard
              this.router.navigateByUrl("/dashboard");
            }
          })
      });

  }
  //Abre el modal
  abrirModal() {
    this.pedido.precio = this.precio;

    if (this.hayCosteDeEnvio()) {
      this.pedido.precio += this.precioEnvio();
    }
    this.modalTarjetaCreditoService.abrirModal(this.pedido);
  }

  //Se muestra popup para confirma si se quiere pagar por contrarrembolso. Si se acepta realiza el pedido
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
      //Si confirma el usuario
      if (result.isConfirmed) {
        //Hace el pedido
        this.hacerPedido();
      }
    })
  }

  //Devuelve true si hay costes de envio
  hayCosteDeEnvio(): boolean {
    return this.precio < precioMinimoSinComisionDeEnvio;
  }

  //Devuelve el precio de envio
  precioEnvio(): number {
    return this.precio * comisionEnvio;
  }

  //Devuelve el precion por pagar contrarrembolso
  precioContrarrembolso(): number {
    return this.precio * comisionContrarrembolso;
  }

  //Devuelve el precio total del pedido sin aplicar comisiones
  getPrecioSinComisiones(): number {
    let precioTotal: number = 0;

    this.lineaPedidos.forEach(linea => {
      precioTotal += linea.producto.precio * linea.cantidad;
    });
    return precioTotal;
  }
}
