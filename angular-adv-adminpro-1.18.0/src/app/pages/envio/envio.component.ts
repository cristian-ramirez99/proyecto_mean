import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido.mode';
import { PedidoService } from 'src/app/services/pedido.service';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  public pedidoTemp: Pedido;
  public direccion: string;

  public direccionForm = this.fb.group(
    {
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      numeroCalle: ['', Validators.required],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      datosAdicionales: [''],
    }
  );

  constructor(public fb: FormBuilder,
    public pedidoService: PedidoService,
    public dirrecionService: DireccionService) { }

  ngOnInit(): void {
    this.cargarPedidoTemp();
    this.direccionForm.setValue({
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      numeroCalle: ['', Validators.required],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      datosAdicionales: [''],
    })
  }
  cargarPedidoTemp() {
    this.pedidoService.cargarPedidoTemp()
      .subscribe(pedidoTemp => {
        this.pedidoTemp = pedidoTemp;
      }, (err) => {
        console.log(err);
      });
  }
  cargarDireccion() {
    this.dirrecionService.cargarDireccion()
      .subscribe(direccion => {
        this.direccion = direccion;
      }, (err) => {

      });
  }
}
