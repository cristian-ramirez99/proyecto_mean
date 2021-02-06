import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Pedido } from '../../models/pedido.mode'
import Swal from 'sweetalert2'
import { PedidoService } from 'src/app/services/pedido.service';
import { Producto, TipoProducto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;
  public pedidos: Pedido[]=[];

  constructor(private modalService: ModalService,
    private pedidoService: PedidoService) { }
  ngOnInit(): void {
    let productos: Producto[]=[];
    productos.push(new Producto('ordenador', 'bobo',40, 'no-image', new TipoProducto('pc', 'mu bonito')));
    productos.push(new Producto('tablet', 'jesus', 50, 'no-image', new TipoProducto('tablet', 'mu bonito')));

    this.pedidos.push(new Pedido(new Date(1, 1, 1, 1, 1), 'enviado', productos,'1fa1ras'));
    this.cargarPedidos();
  }
  abrirModal(pedido:Pedido) {
    console.log("Abriendo modal");
    this.modalService.abrirModal(pedido);
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    console.log(valor);
    //this.PedidosService.cargarPedidos();
  }
  cargarPedidos() {
    console.log("Cargando pedidos");
    //peticion http
    this.cargando = false;
    this.pedidoService.cargarPedidos(this.desde)
      .subscribe(

      )
    //this.pedidos=pedidos;
    this.calcularPrecio();

  }

  //Calcula el precio total de cada pedido
  calcularPrecio() {
    let auxPrecio: number = 0;
    this.pedidos.forEach(pedido => {
      pedido.productos.forEach(producto => {
        auxPrecio += producto.precio;
      });
      //Asigno precioTotal al pedido
      pedido.precio = auxPrecio;
    });
  }
}
