import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirmar-envio',
  templateUrl: './confirmar-envio.component.html',
  styleUrls: ['./confirmar-envio.component.css']
})
export class ConfirmarEnvioComponent implements OnInit {

  public direccion: Direccion;
  public isDireccionCreada: boolean = false;

  constructor(private usuarioService: UsuarioService) { }


  ngOnInit(): void {
    if (this.usuarioService.direccion != null) {
      this.direccion = this.usuarioService.direccion;
      this.isDireccionCreada = true;
    }
  }

}
