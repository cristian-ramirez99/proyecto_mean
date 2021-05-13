import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

const FILTRO_EMAIL: number = 0;
const FILTRO_NOMBRE: number = 2;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']

})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public toggle: boolean[] = [true, false, false, false];
  public filtroSeleccionado: string = "email" || "nombre";
  public sortSeleccionado: string = '';

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios(false, this.filtroSeleccionado);

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios(false, this.filtroSeleccionado));
  }

  //Hace peticion http para obtener todos los usuarios
  cargarUsuarios(hacerToggle: boolean, filtro: string) {
    this.cargando = true;


    if (hacerToggle) {
      this.desde = 0;
      this.changeFiltro(filtro);
    }

    this.usuarioService.cargarUsuarios(this.desde, filtro, this.sortSeleccionado)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;

        if (hacerToggle) {
          let numberFiltro;

          //Actualizamos el nuevoFiltro
          this.filtroSeleccionado = filtro;

          //Cambiamos a number filtro
          if (filtro === "email") {
            numberFiltro = FILTRO_EMAIL;
          } else {
            numberFiltro = FILTRO_NOMBRE;
          }
          this.toggleFiltro(numberFiltro);
        }
      })
  }

  //Muestra una nueva pagina de usuarios
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios(false, this.filtroSeleccionado);
  }

  //Hace peticion http buscar con el termino introducido por el termino
  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe((resp: Usuario[]) => {

        this.usuarios = resp;

      });
  }

  //Muestra popup para confirmar que se desea eliminar un ususario. Si el usuario acepta se hace peticion http y se elimina.
  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    //popup para confirmar la eliminación de un usuario
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        //DELETE usuario
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {

            this.cargarUsuarios(false, this.filtroSeleccionado);
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

  //Hace peticion http para cambiar el rol del usuario
  cambiarRole(usuario: Usuario) {

    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
      })
  }


  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  //Cambia de color el triangulo de ordenacion de los filtros
  toggleFiltro(pos: number) {
    if (this.toggle[pos]) {
      //Vaciamos el array
      this.toggle = [];

      this.toggle[pos + 1] = true;
    } else {
      //Vaciamos el array
      this.toggle = [];
      this.toggle[pos] = true;
    }
  }
  //Cambia el filtro de ordenamiento
  changeFiltro(filtro: string) {
    if (filtro === this.filtroSeleccionado && this.sortSeleccionado === 'desc') {
      this.sortSeleccionado = '';
    } else if (filtro === this.filtroSeleccionado) {
      this.sortSeleccionado = 'desc';
    } else {
      this.sortSeleccionado = '';
    }
  }
}

