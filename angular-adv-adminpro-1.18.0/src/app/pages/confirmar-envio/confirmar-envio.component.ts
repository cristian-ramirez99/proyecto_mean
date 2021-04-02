import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion.model';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  selector: 'app-confirmar-envio',
  templateUrl: './confirmar-envio.component.html',
  styleUrls: ['./confirmar-envio.component.css']
})
export class ConfirmarEnvioComponent implements OnInit {

  public direccion: Direccion;
  public isDireccionCreada: boolean = true;

  constructor(private direccionService: DireccionService) { }


  ngOnInit(): void {
    this.cargarDireccion();
  }

  cargarDireccion() {
    this.direccionService.cargarDireccion()
      .subscribe(direccion => {
        this.direccion = direccion;
        this.isDireccionCreada = true;
      });
    //Borrar !!!
    this.direccion = new Direccion("Manolo", "c/ la mia ", "14 2a 2a", "08922", "Barcelona", "6178624", "Me gustaria que me lo entregara el toni en persona", "1da5daf31ds5");
  }

}
