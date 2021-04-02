import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Direccion } from '../models/direccion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

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

  cargarDireccion() {
    //Usuario ????
    const url = `${base_url}/direccion`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, direccion: Direccion }) => resp.direccion)
      );
  }
  crearDireccion(direccion: Direccion) {
    const url = `${base_url}/direccion`;
    return this.http.post(url, direccion, this.headers)
  }
  modificarDireccion(direccion: Direccion) {
    const url = `${base_url}/direccion/${direccion._id}`;
    return this.http.put(url, direccion, this.headers)

  }
}
