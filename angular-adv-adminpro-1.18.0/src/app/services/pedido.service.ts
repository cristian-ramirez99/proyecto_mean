import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { Pedido } from '../models/pedido.mode';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public productosTemp: Producto[] = [];

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
  cargarPedidos(desde: number = 0) {
    const url = `${base_url}/whatEver/${desde}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, pedidos: Pedido[] }) => resp.pedidos)
      );
  }
  cargarPedidoTemp() {
    //Tambien deberia de saber el usuario 
    const url = `${base_url}/pedidoTemp`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, pedidoTemp: Pedido }) => resp.pedidoTemp)
      );

  }
}
