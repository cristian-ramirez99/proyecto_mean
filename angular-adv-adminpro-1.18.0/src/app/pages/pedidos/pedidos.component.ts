import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Pedido } from '../../models/pedido.mode'
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { filtro } from '../../global/filtroPedido';
import { estado } from 'src/app/global/estado';

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
  public pedidosMostrados: Pedido[] = [];
  public estados: string[] = ["Cualquier estado", estado.proceso, estado.enviado, estado.entregado, estado.cancelado];
  public estadoSeleccionado = this.estados[0];
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
  /*Hace peticion http para cargar los pedidos excepto el temporal*/
  cargarPedidos(filtro: number) {
    this.cargando = true;
    const uid = this.usuarioService.uid;

    this.pedidoService.cargarPedidos(uid, filtro)
      .subscribe((pedidos: Pedido[]) => {
        this.cargando = false;
        this.pedidos = pedidos;
        this.pedidosMostrados = pedidos;

        //Ponemos el value del select a Cualquier estado
        this.estadoSeleccionado = this.estados[0];

        if (this.pedidos.length == 0) {
          this.existenPedidos = false;
        }


        //Destacar el triangulo que indica como estan ordenados los pedidos
        this.toggleFiltro(filtro);

        //Se tiene que crear un new Date, si no no funciona
        pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
        });

      });
  }

  //Cambia de color el triangulo de ordenacion de los filtros
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

  //Filtra los pedidos por estado seleccionado
  cambiarEstado(estado: string) {
    //Si tiene cualquier pedido
    if (estado === this.estados[0]) {
      this.pedidosMostrados = this.pedidos;
    } else {
      this.pedidosMostrados = this.pedidos.filter(pedido => pedido.estado === estado);
    }
  }
}
