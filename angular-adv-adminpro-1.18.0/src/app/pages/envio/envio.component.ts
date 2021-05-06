import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion.model';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  public direccion: Direccion = new Direccion('', '', '', '', '', '123456789', '', '');

  private isDireccionCreada: boolean = false;
  private formSubmitted = false;

  public direccionForm = this.fb.group(
    {
      nombreDestinatario: ['', Validators.required],
      calle: ['', Validators.required],
      numeroPortal: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      datosAdicionales: [''],
    }

  );

  constructor(public fb: FormBuilder,
    public pedidoService: PedidoService,
    public dirrecionService: DireccionService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    //Comprobamos si existe direccion ya creada
    if (this.usuarioService.direccion != null) {
      this.direccion = this.usuarioService.direccion;
      this.isDireccionCreada = true;

      //Actualizamos el value de los inputs
      this.direccionForm.setValue({
        nombreDestinatario: this.direccion.nombreDestinatario,
        calle: this.direccion.calle,
        numeroPortal: this.direccion.numeroPortal,
        codigoPostal: this.direccion.codigoPostal,
        localidad: this.direccion.localidad,
        telefono: this.direccion.telefono,
        datosAdicionales: this.direccion.datosAdicionales,
      });
    }

  }

  /*Peticion http que si los campos son valido hace peticion http modificar o crear dirección, dependiendo si ya existe dirección creada del usuario*/
  async guardarDireccion() {
    this.formSubmitted = true;

    //Control de errores 
    if (this.codigoPostalNoValido() || this.telefonoNoValido()) {
      return;
    }

    //Si existe dirección 
    if (this.isDireccionCreada) {

      const data = {
        ...this.direccionForm.value,
        _id: this.direccion._id
      }

      //PUT modificarDireccion
      this.dirrecionService.modificarDireccion(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', "Dirrección actualizada correctamente", 'success');
        });

        //No existe dirección
    } else {
      //POST crearDireccion
      await this.dirrecionService.crearDireccion(this.direccionForm.value)
        .toPromise()
        .then((resp: { ok: boolean, direccion: Direccion }) => {
          Swal.fire('Creado', "Dirección creada correctamente", 'success');
          this.direccion._id = resp.direccion._id;
          this.isDireccionCreada = true;
        })
      this.actualizarUsuario();
    }
  }

  // Hace peticion http que añade al usuario la direccion o la modifica 
  actualizarUsuario() {
    const data = {
      direccion: this.direccion._id,
    }

    const uid = this.usuarioService.uid;

    this.usuarioService.actualizarUsuario(data, uid)
      .subscribe((resp: { ok: Boolean, usuario: Usuario }) => {
        this.usuarioService.setDireccion(resp.usuario.direccion);
      })
  }

  //Devuelve false si el codigo postal es valido
  public codigoPostalNoValido(): boolean {
    const { cp } = this.direccionForm.value;

    if ((parseInt(cp) < 1000 || parseInt(cp) > 52999) && this.formSubmitted) {
      return true;
    }
    return false;
  }
  //Devuelve true si solo introduce valores numericos
  public telefonoNoValido(): boolean {
    const { telefono } = this.direccionForm.value;

    if (!(/^\d{9}$/.test(telefono)) && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
