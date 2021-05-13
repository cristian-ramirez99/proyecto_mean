import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { estado } from 'src/app/global/estado';
import { filtro } from 'src/app/global/filtroPedido';
import { Pedido } from 'src/app/models/pedido.mode';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalService } from 'src/app/services/modal.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-todo-pedidos',
  templateUrl: './todo-pedidos.component.html',
  styleUrls: ['./todo-pedidos.component.css']
})
export class TodoPedidosComponent implements OnInit {

  readonly filtro = filtro;
  public cargando: boolean = true;
  public desde: number = 0;
  public pedidos: Pedido[] = [];
  public pedidosMostrados: Pedido[] = [];
  public usuarios: Usuario[] = [];
  public existenPedidos = true;
  public toggle: boolean[] = [true, false, false, false];
  public estados: string[] = [estado.proceso, estado.enviado, estado.entregado, estado.cancelado];
  public estadoSeleccionado = "Cualquier estado";
  public totalPedidos: number = 0;

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.cargarPedidos(this.estadoSeleccionado, false);
  }

  abrirModal(pedido: Pedido) {
    this.modalService.abrirModal(pedido);
  }

  //Hace peticion http para actualizar el estado del pedido
  actualizarEstado(pedido: Pedido) {
    this.pedidoService.actualizarPedido(pedido)
      .subscribe()
  }
  cargarPedidos(estado, hacerToggle: boolean) {
    this.cargando = true;

    console.log(estado);
    console.log(this.estadoSeleccionado);

    //EstadoSeleccionado esta en html binding
    if (estado != this.estadoSeleccionado) {
      this.desde = 0;
    }

    this.pedidoService.cargarTodosLosPedidos(this.desde, estado)
      .subscribe(resp => {
        this.cargando = false;
        this.pedidos = resp.pedidos;
        this.pedidosMostrados = resp.pedidos;
        this.totalPedidos = resp.total;

        //Ponemos el value del select a Cualquier estado
        this.estadoSeleccionado = estado;

        if (this.pedidos.length == 0) {
          this.existenPedidos = false;
        }

        if (hacerToggle) {
          //Destacar el triangulo que indica como estan ordenados los pedidos
          this.toggleFiltro(filtro.filtroFecha);
        }

        //Se tiene que crear un new Date, si no funciona
        resp.pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
        });

      })
  }
  //Muestra una nueva pagina de pedidos
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalPedidos) {
      this.desde -= valor;
    }


    this.cargarPedidos(this.estadoSeleccionado, false);
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

}