import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-carrito-de-la-compra',
  templateUrl: './carrito-de-la-compra.component.html',
  styleUrls: ['./carrito-de-la-compra.component.css']
})
export class CarritoDeLaCompraComponent implements OnInit {

  constructor(public router: Router,
    public pedidoService: PedidoService) { }

  public productos: Producto[] = [];

  ngOnInit(): void {
    this.productos = this.pedidoService.productosTemp;
    //producto vacio
    //let productos: Producto[] = [];
    this.productos.push(new Producto('ordenador', 'bobo', 40, 'no-image', new TipoProducto('pc', 'mu bonito'), '1', 2));
    this.productos.push(new Producto('ordenador', 'bobo', 40, 'no-image', new TipoProducto('pc', 'mu bonito'), '1', 2));

  }
  carritoVacio() {
    return this.productos.length == 0 ? true : false;
  }

  getPrecioTotal(): number {
    let precioTotal: number = 0;
    //Esto hay que cambiarlo !!!!!!!!!!!!!!!!!!!!!!!!
    const cantidad = 1;

    this.productos.forEach(producto => {
      precioTotal += producto.precio * cantidad;
    });
    return precioTotal;
  }
  eliminarProducto(id: string) {
    for (let i = 0; this.productos.length > i; i++) {
      if (this.productos[i]._id === id) {
        this.productos.splice(i, 1);
      }
    }
  }

}
