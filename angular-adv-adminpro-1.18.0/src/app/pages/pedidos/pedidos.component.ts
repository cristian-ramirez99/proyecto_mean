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
  public pedidos: Pedido[] = [];


  constructor(private modalService: ModalService,
    private pedidoService: PedidoService) { }
  ngOnInit(): void {
    // this.cargarPedidos();
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
    cargarPedidos() {
      this.calcularPrecio();
    }
  
    //Calcula el precio total de cada pedido
    calcularPrecio() {
      let auxPrecio: number;
      this.pedidos.forEach(pedido => {
        auxPrecio = 0;
        pedido.productos.forEach(producto => {
          auxPrecio += producto.precio;
        });
        //Asigno precioTotal al pedido
        pedido.precio = auxPrecio;
      });
    } */
}
