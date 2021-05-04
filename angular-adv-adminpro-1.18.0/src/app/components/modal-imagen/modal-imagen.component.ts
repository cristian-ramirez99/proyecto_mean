import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  //Cerra modal
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  /*Cambia la imagen que visualiza el usuario*/
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
  /*Hace peticion http para actualizar la imagen*/
  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        //Muestra mensaje de todo ok
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        //Cerra modal
        this.cerrarModal();
      }).catch(err => {
        //Muestra mensaje de error
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
