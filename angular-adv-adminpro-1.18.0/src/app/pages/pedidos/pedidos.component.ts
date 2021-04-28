import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Pedido } from '../../models/pedido.mode'
import Swal from 'sweetalert2'
import { PedidoService } from 'src/app/services/pedido.service';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;
  public pedidos: Pedido[] = [];
  public toggle: boolean[] = [true, false, false, false];

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }
  abrirModal(pedido: Pedido) {
    console.log("Abriendo modal");
    this.modalService.abrirModal(pedido);
  }
  /*
    cambiarPagina(valor: number) {
      this.desde += valor;
      console.log(valor);
      //this.PedidosService.cargarPedidos();
    }

     */
  cargarPedidos() {
    this.cargando = true;
    const uid = this.usuarioService.uid;

    this.pedidoService.cargarPedidos(uid)
      .subscribe((pedidos: Pedido[]) => {
        this.cargando = false;
        this.pedidos = pedidos;

        //Destacar el triangulo que indica como estan ordenados los pedidos
        this.toggleFiltroNombre();

        //Se tiene que crear un new Date, si no funciona
        pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
          console.log(pedido.fecha.getDate());
        });

      });
  }
  cargarPedidosFiltroPrecio() {
    this.cargando = true;
    const uid = this.usuarioService.uid;

    this.pedidoService.cargarPedidosFiltroPrecio(uid)
      .subscribe((pedidos: Pedido[]) => {
        this.cargando = false;
        this.pedidos = pedidos;

        //Destacar el triangulo que indica como estan ordenados los pedidos
        this.toogleFiltroPrecio();

        //Se tiene que crear un new Date, si no funciona
        pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
          console.log(pedido.fecha.getDate());
        });

      });
  }
  toggleFiltroNombre() {
    if (this.toggle[1] || this.toggle[2] || this.toggle[3]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[0] = true;
    } else if (this.toggle[0]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[1] = true;
      this.pedidos.reverse()
    }
  }
  toogleFiltroPrecio() {
    if (this.toggle[0] || this.toggle[1] || this.toggle[3]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[2] = true;
    } else if (this.toggle[2]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[3] = true;
      this.pedidos.reverse()

    }
  }
}
