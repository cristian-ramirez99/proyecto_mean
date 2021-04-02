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

  private _id: string;

  constructor(private http: HttpClient) { }

  get id(): string {
    return this._id;
  }
  setId(id: string) {
    this._id = id;
  }
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

  cargarProducto() {
    const url = `${base_url}/producto/${this._id}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, producto: Producto }) => resp.producto)
      );
  }
  eliminarProducto(_id: string) {
    const url = `${base_url}/producto/${_id}`
    return this.http.delete(url, this.headers);
  }
  actualizarProducto(producto: Producto) {
    const url = `${base_url}/producto/${producto._id}`
    return this.http.put(url, producto, this.headers);
  }
  crearProducto(producto: Producto) {
    const url = `${base_url}/producto`;
    return this.http.post(url, producto, this.headers);
  }
  
  cargarTipoProductos() {
    const url = `${base_url}/tipoProductos`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, tipoProductos: TipoProducto[] }) => resp.tipoProductos)
      );
  }
  modificarTipoProducto(categoria: TipoProducto) {
    const url = `${base_url}/tipoProducto/${categoria._id}`;
    return this.http.put(url, categoria.caracteristicas, this.headers);
  }
  crearTipoProducto(categoria: TipoProducto) {
    const url = `${base_url}/tipoProducto`;
    return this.http.post(url, categoria, this.headers)
  }
}

