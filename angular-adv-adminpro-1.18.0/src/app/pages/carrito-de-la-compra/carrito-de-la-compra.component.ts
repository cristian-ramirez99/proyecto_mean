import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carrito-de-la-compra',
  templateUrl: './carrito-de-la-compra.component.html',
  styleUrls: ['./carrito-de-la-compra.component.css']
})
export class CarritoDeLaCompraComponent implements OnInit {

  constructor(public router: Router,
    public pedidoService: PedidoService,
    public lineaPedidoService: LineaPedidoService,
    public usuarioService: UsuarioService,
    public productoService: ProductoService
  ) { }

  public cargando: boolean = true;

  public pedido: Pedido;
  public idPedido: string;
  public lineaPedidos: LineaPedido[] = [];

  async ngOnInit(): Promise<void> {
    const uid = this.usuarioService.uid;

    this.cargando = true;
    //CargarPedidoTemp
    await this.pedidoService.cargarPedidoTemp(uid)
      .toPromise()
      .then(pedidoTemp => {
        if (pedidoTemp != null) {
          this.idPedido = pedidoTemp._id;
          console.log(this.idPedido);
        } else {
          this.cargando = false;
        }
      })

    if (this.idPedido != null) {
      this.cargarLineaPedidos();
    }
  }
  cargarLineaPedidos() {
    this.lineaPedidoService.cargarLineaPedidos(this.idPedido)
      .subscribe((lineaPedidos: LineaPedido[]) => {
        this.cargando = false;
        this.lineaPedidos = lineaPedidos;
      })
  }
  carritoVacio() {
    return this.lineaPedidos.length == 0;
  }

  getPrecioTotal(): number {
    let precioTotal: number = 0;

    this.lineaPedidos.forEach(linea => {
      precioTotal += linea.producto.precio * linea.cantidad;
    });
    return precioTotal;
  }
  eliminarProducto(lineaPedido: LineaPedido) {
    this.actualizarStockDelProducto(lineaPedido);

    this.lineaPedidoService.eliminarLineaPedido(lineaPedido._id)
      .subscribe(resp => {
        console.log(resp);
      })

    for (let i = 0; this.lineaPedidos.length > i; i++) {
      if (this.lineaPedidos[i]._id === lineaPedido._id) {
        this.lineaPedidos.splice(i, 1);
      }
    }
  }
  actualizarStockDelProducto(lineaPedido: LineaPedido) {
    const stock = lineaPedido.cantidad + lineaPedido.producto.stock;

    const data = {
      stock: stock,
      _id: lineaPedido.producto._id,
    }
    this.productoService.actualizarStockDelProducto(data)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
