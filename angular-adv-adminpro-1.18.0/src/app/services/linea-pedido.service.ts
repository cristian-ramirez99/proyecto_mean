import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { LineaPedido } from '../models/lineaPedido.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LineaPedidoService {


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


  crearLineaPedido(lineaPedido: any) {
    const url = `${base_url}/lineaPedidos`;
    return this.http.post(url, lineaPedido, this.headers);
  }
  cargarLineaPedidos(idPedido: string) {
    const url = `${base_url}/lineaPedidos/${idPedido}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, lineaPedido: LineaPedido[] }) => resp.lineaPedido)
      );
  }
  eliminarLineaPedido(id: string) {
    const url = `${base_url}/lineaPedidos/${id}`;
    return this.http.delete(url, this.headers);
  }
}