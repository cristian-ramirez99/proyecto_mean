import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LineaPedido } from '../models/lineaPedido.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

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
  getEstadisticas() {
    const url = `${base_url}/estadisticas`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, lineaPedidos: LineaPedido[] }) => resp.lineaPedidos)
      );
  }
}