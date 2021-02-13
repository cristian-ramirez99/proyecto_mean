import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto, TipoProducto } from '../models/producto.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarProductos() {
    const url = `${base_url}/productos`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, productos: Producto[] }) => resp.productos)
      );
  }
  cargarTipoProductos() {
    const url = `${base_url}/tipoProductos`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, tipoProductos: TipoProducto[] }) => resp.tipoProductos)
      );
  }
  cargarProducto(id: string) {
    const url = `${base_url}/producto/${id}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, producto: Producto }) => resp.producto)
      );
  }
}
