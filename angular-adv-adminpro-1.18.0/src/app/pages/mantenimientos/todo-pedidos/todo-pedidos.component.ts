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
  public pedidos: Pedido[][] = [];
  public pedidosMostrados: Pedido[][] = [];
  public usuarios: Usuario[] = [];
  public existenPedidos = true;
  public toggle: boolean[] = [true, false, false, false];
  public estados: string[] = [estado.proceso, estado.enviado, estado.entregado, estado.cancelado];
  public estadoSeleccionado = "Cualquier estado";

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.usuarioService.cargarTodosLosUsuarios()
      .toPromise()
      .then(resp => {
        console.log(resp);
        this.usuarios = resp.usuarios;

      })
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
  async cargarPedidos(filtro: number) {
    this.cargando = true;

    for (let i = 0; this.usuarios.length > i; i++) {
      const uid = this.usuarios[i].uid;
      console.log(uid);

      await this.pedidoService.cargarPedidos(uid, filtro)
        .toPromise()
        .then((pedidos: Pedido[]) => {
          console.log(pedidos);
          this.cargando = false;
          this.pedidos[i] = pedidos;
          this.pedidosMostrados[i] = pedidos;


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

        })
    }
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
      this.pedidosMostrados = this.pedidos.filter(pedido =>
        this.usuarios.forEach(usuario => {
          pedido[usuario.uid].estado === estado;
        }));
    }
  }
  getPedidosTotales() {
    let pedidosTotales = 0;

    this.pedidosMostrados.forEach(pedidos => {
      pedidosTotales += pedidos.length;
    });
    return pedidosTotales;
  }
}
