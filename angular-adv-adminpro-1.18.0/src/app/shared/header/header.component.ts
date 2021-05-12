import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido.mode';
import { ProductoService } from 'src/app/services/producto.service';
import { filtro } from 'src/app/global/filtroProducto';

const minStock = 7;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public lineaPedidos: LineaPedido[] = [];
  public productos: Producto[] = [];
  private idPedido: string;
  public primeraVez: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private lineaPedidoService: LineaPedidoService,
    private pedidoService: PedidoService,
    private productoService: ProductoService) {
    this.usuario = usuarioService.usuario;
  }
  async ngOnInit() {

    if (this.primeraVez) {
      this.primeraVez = false;
      await this.pedidoService.cargarPedidoTemp(this.usuarioService.uid)
        .toPromise()
        .then((pedido: Pedido) => {
          this.idPedido = pedido._id;
        })

      this.lineaPedidoService.cargarLineaPedidos(this.idPedido)
        .subscribe((lineaPedidos: LineaPedido[]) => {
          this.lineaPedidos = lineaPedidos;
        })
    }
    await this.productoService.cargarProductos(filtro.filtroStock)
      .toPromise()
      .then((producto: Producto[]) => {
        //Estaria ordenado de menor a mayor cantidad de stock
        this.productos = producto.reverse();
      })

    this.productosConStockPorDebajoDeMinimo();
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

  carritoVacio() {
    return this.lineaPedidos.length == 0 ? true : false;
  }
  getPrecioTotal() {
    let precioTotal: number = 0;

    this.lineaPedidos.forEach(lineaPedido => {
      precioTotal += lineaPedido.producto.precio * lineaPedido.cantidad;
    });
    return precioTotal;
  }
  eliminarProducto(lineaPedido: LineaPedido) {
    this.actualizarStockDelProducto(lineaPedido);

    this.lineaPedidoService.eliminarLineaPedido(lineaPedido._id)
      .subscribe(resp => {
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
  salir() {
    this.primeraVez = true;
  }

  reabastacerAutomaticoStock(id: string) {

    this.productoService.reabastecimientoAutomaticoStockDelProducto(id, minStock)
      .subscribe(resp => {
        console.log("Reabastecido si");
      })
  }

  getProductos() {
    this.productoService.cargarProductos(filtro.filtroStock)
      .subscribe((producto: Producto[]) => {
        //Estaria ordenado de menor a mayor cantidad de stock
        this.productos = producto.reverse();
      })
  }
  productosConStockPorDebajoDeMinimo() {
    for (let i = 0; this.productos.length > i; i++) {
      console.log(this.productos[i].stock);
      console.log(this.productos[i].stock <= minStock);
      if (this.productos[i].stock <= minStock) {
        this.reabastacerAutomaticoStock(this.productos[i]._id);
      }
    }
  }
}
