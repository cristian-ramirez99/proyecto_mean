import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public productos: Producto[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = usuarioService.usuario;
  }
  ngOnInit() {
    this.productos.push(new Producto('portatil', 'grauBobo', 50, 'no-image', new TipoProducto('pc', 'mu bonito'), '3', 1));
    this.productos.push(new Producto('mouse', 'mouseDeLocos', 80, 'no-image', new TipoProducto('mouse', 'bobo'), '4', 7));
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
    return this.productos.length == 0 ? true : false;
  }
  getPrecioTotal() {
    //Esto hay que cambiarlo !!!!!!!!!!!!!!!!!!!!!
    const cantidad = 1;
    let precioTotal: number = 0;

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
