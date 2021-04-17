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


  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    public usuarioService: UsuarioService,
    private busquedasService:BusquedasService) { }

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

        //Se tiene que crear un new Date, si no funciona
        pedidos.forEach(pedido => {
          pedido.fecha = new Date(pedido.fecha);
          console.log(pedido.fecha.getDate());
        });

      });
  }
}
