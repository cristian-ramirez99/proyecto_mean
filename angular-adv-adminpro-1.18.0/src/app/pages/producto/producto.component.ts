import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public cantidadPorUsuario = [1, 2, 3, 4, 5];
  public cantidadSeleccionada: number = 1;

  public producto: Producto;
  public pedidoTemp: Pedido;

  constructor(private productoService: ProductoService,
    public pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProducto(id));

    this.cargarPedidoTemp();
  }
  cargarProducto(id: string) {
    console.log(id);
    this.productoService.cargarProducto(id)
      .subscribe(producto => {
        this.producto = producto;
      })
  }
  quedaStock() {
    return this.producto.cantidad > 0;
  }

  cargarPedidoTemp() {
    this.pedidoService.cargarPedidoTemp()
      .subscribe(pedidoTemp => {
        this.pedidoTemp = pedidoTemp;
      })
  }
  addAlCarrito() {
    if (this.quedaStock) {

      //Si existe pedidoTemporal
      if (this.pedidoTemp) {
        this.pedidoTemp.productos.push(this.producto);
        this.actualizarPedido();

        //Crear pedidoTemporal
      } else {
        this.crearPedido();
      }
    }
  }
  actualizarPedido() {
    this.pedidoService.actualizarPedido(this.pedidoTemp)
      .subscribe(resp => {
        Swal.fire('Accion realizada con éxito', 'Producto añadido al carrito(actualizar)', 'success');
      })
  }
  crearPedido() {
    let productos: Producto[] = [];
    productos.push(this.producto);

    const pedido = new Pedido('temporal', productos);

    this.pedidoService.crearPedido(pedido)
      .subscribe(resp => {
        Swal.fire('Accion realizada con éxito', 'Producto añadido al carrito(crear)', 'success');
      })
  }

  setCantidadSeleccionada(newCantidad: number) {
    this.cantidadSeleccionada = newCantidad;
  }
}