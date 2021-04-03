import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TarjetaCredito } from '../models/tarjetaCredito.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TarjetaCreditoService {

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
  crearTarjetaCredito(tarjetaCredito: TarjetaCredito) {
    const url = `${base_url}/tarjetaCredito`;
    return this.http.put(url, tarjetaCredito, this.headers);
  }

  modificarTarjetaCredito(tarjetaCredito: TarjetaCredito) {
    const url = `${base_url}/tarjetaCredito/${tarjetaCredito._id}`;
    return this.http.put(url, tarjetaCredito, this.headers);

  }
  cargarTarjetaCredito() {
    //Tambien deberia de saber el usuario 
    const url = `${base_url}/tarjetaCredito`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, tarjetaCredito: TarjetaCredito }) => resp.tarjetaCredito)
      );
  }
}
