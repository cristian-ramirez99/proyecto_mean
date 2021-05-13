import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { Pedido } from '../models/pedido.mode';
import { filtro } from '../global/filtroPedido';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

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

  cargarTodosLosPedidos(desde: number = 0, estado: string = "Cualquier estado", sort: string = "desc") {
    const url = `${base_url}/pedidos?desde=${desde}&estado=${estado}&sort=${sort}`;

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, pedidos: Pedido[], total: number }) => resp)
      );
  }
  cargarPedidos(uid: string, filtroValue: number) {
    let url;

    if (filtroValue == filtro.filtroFecha) {
      url = `${base_url}/pedidos/${uid}`;
    } else {
      url = `${base_url}/pedidos/filtroPrecio/${uid}`;
    }

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, pedidos: Pedido[] }) => resp.pedidos)
      );
  }

  cargarPedidoTemp(uid: string) {
    //Tambien deberia de saber el usuario 
    const url = `${base_url}/pedidos/temp/${uid}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, pedido: Pedido }) => resp.pedido)
      );
  }
  actualizarPedido(pedido: Pedido) {
    const url = `${base_url}/pedidos/${pedido._id}`
    return this.http.put(url, pedido, this.headers);
  }
  crearPedido(pedido: Pedido) {
    const url = `${base_url}/pedidos`;
    return this.http.post(url, pedido, this.headers);

  }
}
