import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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
        map((resp: { ok: boolean, direccion: string }) => resp.direccion)
      );
  }
}
