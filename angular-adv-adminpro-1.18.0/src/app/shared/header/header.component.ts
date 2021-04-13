import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido.mode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public lineaPedidos: LineaPedido[] = [];
  private idPedido: string;
  public primeraVez: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private lineaPedidoService: LineaPedidoService,
    private pedidoService: PedidoService) {
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
  eliminarProducto(id: string) {
    this.lineaPedidoService.eliminarLineaPedido(id)
      .subscribe(resp => {
      })

    for (let i = 0; this.lineaPedidos.length > i; i++) {
      if (this.lineaPedidos[i]._id === id) {
        this.lineaPedidos.splice(i, 1);
      }
    }
  }
  salir() {
    this.primeraVez = true;
  }
}
