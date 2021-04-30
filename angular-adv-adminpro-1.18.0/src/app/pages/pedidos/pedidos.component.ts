import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Pedido } from '../../models/pedido.mode'
import Swal from 'sweetalert2'
import { PedidoService } from 'src/app/services/pedido.service';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { filtro } from '../../global/filtroPedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  readonly filtro = filtro;
  public cargando: boolean = true;
  public desde: number = 0;
  public pedidos: Pedido[] = [];
  public existenPedidos = true;
  public toggle: boolean[] = [true, false, false, false];

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarPedidos(filtro.filtroFecha);
  }
  abrirModal(pedido: Pedido) {
    console.log("Abriendo modal");
    this.modalService.abrirModal(pedido);
  }

  cargarPedidos(filtro: number) {
    this.cargando = true;
    const uid = this.usuarioService.uid;

    this.pedidoService.cargarPedidos(uid, filtro)
      .subscribe((pedidos: Pedido[]) => {
        this.cargando = false;
        this.pedidos = pedidos;

        if (this.pedidos.length == 0) {
          this.existenPedidos = false;
        }

        //Destacar el triangulo que indica como estan ordenados los pedidos
        this.toggleFiltro(filtro);

        //Se tiene que crear un new Date, si no funciona
        pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
        });

      });
  }

  toggleFiltro(pos: number) {
    if (this.toggle[pos]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[pos + 1] = true;
      this.pedidos.reverse()

    } else {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[pos] = true;
    }
  }
}
