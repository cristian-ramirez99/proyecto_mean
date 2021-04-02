import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  public direccion: Direccion;

  private isDireccionCreada: boolean = false;
  private formSubmitted = false;

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
    this.cargarDireccion();

    if (this.isDireccionCreada) {
      this.direccionForm.setValue({
        nombre: [this.direccion.nombre],
        calle: [this.direccion.calle],
        numeroCalle: [this.direccion.numeroCalle],
        cp: [this.direccion.cp],
        localidad: [this.direccion.localidad],
        telefono: [this.direccion.telefono],
        datosAdicionales: [this.direccion.datosAdicionales],
      })
    }

  }

  cargarDireccion() {
    this.dirrecionService.cargarDireccion()
      .subscribe(direccion => {
        this.direccion = direccion;
        this.isDireccionCreada = true;
      });
  }
  guardarDireccion() {
    this.formSubmitted = true;

    //Control de errores 
    if (this.codigoPostalNoValido() || this.telefonoNoValido()) {
      return;
    }

    if (this.isDireccionCreada) {
      //Modificar direccion
      console.log("Modificando dirrecion");

      const data = {
        ...this.direccionForm.value,
        _id: this.direccion._id
      }

      //Put modificarDireccion
      this.dirrecionService.modificarDireccion(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', "Dirrección actualizada correctamente", 'success');
        });
      //Borrar !!!
      Swal.fire('Actualizado', "Dirrección actualizada correctamente", 'success');

    } else {
      //Crear direccion
      console.log("Creando dirrecion");

      //Post crearDireccion
      this.dirrecionService.crearDireccion(this.direccionForm.value)
        .subscribe(resp => {
          Swal.fire('Creado', "Dirección creada correctamente", 'success');
        });
      //Borrar !!!
      Swal.fire('Creado', "Dirección creada correctamente", 'success');
    }
  }
  public codigoPostalNoValido(): boolean {
    const { cp } = this.direccionForm.value;

    if ((cp.length != 5 || parseInt(cp) < 1000 || parseInt(cp) > 52999) && this.formSubmitted) {
      console.log("CP mal");
      return true;
    }
    return false;
  }
  public telefonoNoValido(): boolean {
    const { telefono } = this.direccionForm.value;

    if (!(/^\d{9}$/.test(telefono)) && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
