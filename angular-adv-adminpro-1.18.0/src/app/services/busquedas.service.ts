import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }


  private transformarProductos(resultados: any[]): Producto[] {
    return resultados;
  }

  busquedaGlobal(termino: string) {

    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);

  }


  buscar(
    tipo: 'usuarios' | 'productos',
    termino: string
  ) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados)

            case 'productos':
              return this.transformarProductos(resp.resultados)

            default:
              return [];
          }

        })
      );

  }


}
