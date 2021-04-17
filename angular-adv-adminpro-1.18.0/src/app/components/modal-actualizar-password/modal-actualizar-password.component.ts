import { Component, OnInit } from '@angular/core';
import { ModalActualizarPasswordService } from '../../services/modal-actualizar-password.service';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-actualizar-password',
  templateUrl: './modal-actualizar-password.component.html',
  styleUrls: ['./modal-actualizar-password.component.css']
})
export class ModalActualizarPasswordComponent implements OnInit {

  public formSubmitted: boolean = false;
  public primeraVez: boolean = true;
  public changePasswordForm = this.fb.group({
    antiguaPassword: ['', Validators.required],
    nuevaPassword: ['', Validators.required],
  });

  constructor(public modalActualizarPasswordService: ModalActualizarPasswordService,
    public usuarioService: UsuarioService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.primeraVez) {
      this.primeraVez = false;
      this.changePasswordForm.setValue({
        antiguaPassword: '',
        nuevaPassword: '',
      })
    }
  }

  cerrarModal() {
    if (this.formSubmitted) {
      this.formSubmitted = false;
    }
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalActualizarPasswordService.cerrarModal();
  }
  actualizarPassword() {
    if (!this.formSubmitted) {
      this.formSubmitted = true;
    }

    if (this.changePasswordForm.invalid) {
      return;
    }

    console.log(this.changePasswordForm.value);
    //Actualizar password
    this.usuarioService.actualizarPassword(this.changePasswordForm.value)
      .subscribe(resp => {
        Swal.fire('Accion realizada', 'Su contraseña ha sido cambiada correctamente', 'success').then(result => {
          if (result.isConfirmed) {
            this.cerrarModal();
          }
        });

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });


  }

  campoNoValido(campo: string): boolean {

    if (this.changePasswordForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
