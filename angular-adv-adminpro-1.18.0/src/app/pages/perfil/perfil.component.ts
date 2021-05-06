import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import { ModalActualizarPasswordService } from 'src/app/services/modal-actualizar-password.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService,
    public modalActualizarPasswordService: ModalActualizarPasswordService
  ) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  /*Hace peticion http para actualizar la contraseña*/
  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        //Muestra mensaje conforme todo salio bien
        Swal.fire('Accion exitosa', 'Su contraseña ha sido actualizada', 'success');
      }, (err) => {
        //Muestra mensaje conforme hay un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  /*Hace peticion http para actualizar la imagen de perfil del usuario*/
  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;

        //Muestra mensaje conforme todo salio bien
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {

        //Muestra mensaje conforme hay un error
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }
  abrirModal() {
    this.modalActualizarPasswordService.abrirModal();
  }
}
