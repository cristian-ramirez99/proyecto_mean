import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-carrito-de-la-compra',
  templateUrl: './carrito-de-la-compra.component.html',
  styleUrls: ['./carrito-de-la-compra.component.css']
})
export class CarritoDeLaCompraComponent implements OnInit {

  constructor(public router: Router) { }

  public pedido: Pedido;
  ngOnInit(): void {
    //producto vacio
    //let productos: Producto[] = [];
    //productos.push(new Producto('ordenador', 'bobo', 40, 'no-image', new TipoProducto('pc', 'mu bonito'), '1', 2));
    this.pedido = new Pedido(new Date(1, 1, 1, 1, 1), 'enviado', [], '1fa1ras');
  }
  carritoVacio() {
    return this.pedido.productos.length == 0 ? true : false;
  }

}
