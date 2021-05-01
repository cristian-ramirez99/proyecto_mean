import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  public productos: Producto[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ termino }) => this.busquedaGlobal(termino));

  }

  busquedaGlobal(termino: string) {

    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        console.log(resp)
        this.usuarios = resp.usuarios;
        this.productos = resp.productos;
      });
  }

  isAdmin() {
    return this.usuarioService.role === "ADMIN_ROLE";
  }

}
