import { Component } from '@angular/core';
import { ModalRecuperarPasswordService } from 'src/app/services/modal-recuperar-password.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-recuperar-password',
  templateUrl: './modal-recuperar-password.component.html',
  styleUrls: ['./modal-recuperar-password.component.css']
})
export class ModalRecuperarPasswordComponent {

  constructor(public modalRecuperarPasswordService: ModalRecuperarPasswordService,
    private usuarioService: UsuarioService) { }

  /*Peticion http para recupera la contraseña*/
  recuperarPassword(resp: string) {
    const email = { "email": resp };

    this.usuarioService.recuperarPassword(email)
      .subscribe(resp => {
        //Muestra mensaje de todo ok 
        Swal.fire("Contraseña restablecida", "Revisa tu correo electronico para ver tu nueva contraseña", 'success')
          .then(resp => {
            if (resp.isConfirmed) {
              //Cerrar modal
              this.cerrarModal();
            }
          })
      }, (err) => {
        //Muestra mensaje de error
        Swal.fire('Error', 'El correo introducido no esta registrado en la aplicación ', 'error');
      });
  }

  cerrarModal() {
    this.modalRecuperarPasswordService.cerrarModal();
  }
}
