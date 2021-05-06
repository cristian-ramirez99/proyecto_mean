import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.mode';
import { ModalService } from 'src/app/services/modal.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { filtro } from '../../../global/filtroPedido';
import { estado } from '../../../global/estado';

@Component({
  selector: 'app-pedidos-por-id',
  templateUrl: './pedidos-por-id.component.html',
  styleUrls: ['./pedidos-por-id.component.css']
})
export class PedidosPorIdComponent implements OnInit {

  readonly filtro = filtro;
  public cargando: boolean = true;
  public desde: number = 0;
  public pedidos: Pedido[] = [];
  public pedidosMostrados: Pedido[] = [];
  public existenPedidos = true;
  public toggle: boolean[] = [true, false, false, false];
  public estados: string[] = [estado.proceso, estado.enviado, estado.entregado, estado.cancelado];
  public estadoSeleccionado = "Cualquier estado";
  public uid: string;

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Obtiene el id del url 
    this.activatedRoute.params
      .subscribe(({ id }) => this.uid = id);

    this.cargarPedidos(filtro.filtroFecha);
  }

  abrirModal(pedido: Pedido) {
    this.modalService.abrirModal(pedido);
  }

  //Hace peticion http para actualizar el estado del pedido
  actualizarEstado(pedido: Pedido) {
    this.pedidoService.actualizarPedido(pedido)
      .subscribe()
  }

  //Hace peticion http para cargar todos los pedidos excepto el temporal
  cargarPedidos(filtro: number) {
    this.cargando = true;

    this.pedidoService.cargarPedidos(this.uid, filtro)
      .subscribe((pedidos: Pedido[]) => {
        this.cargando = false;
        this.pedidos = pedidos;
        this.pedidosMostrados = pedidos;


        //Ponemos el value del select a Cualquier estado
        this.estadoSeleccionado = "Cualquier estado";

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
    if (estado === "Cualquier estado") {
      this.pedidosMostrados = this.pedidos;
    } else {
      this.pedidosMostrados = this.pedidos.filter(pedido => pedido.estado === estado);
    }
  }
}
