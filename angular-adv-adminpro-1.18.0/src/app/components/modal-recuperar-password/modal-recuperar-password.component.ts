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

  recuperarPassword(resp: string) {
    const email = { "email": resp };
    console.log(email);
    this.usuarioService.recuperarPassword(email)
      .subscribe(resp => {
        Swal.fire("Contraseña restablecida", "Revisa tu correo electronico para ver tu nueva contraseña", 'success')
          .then(resp => {
            if (resp.isConfirmed) {
              this.cerrarModal();
            }
          });
      });
  }

  cerrarModal() {
    this.modalRecuperarPasswordService.cerrarModal();
  }
}
