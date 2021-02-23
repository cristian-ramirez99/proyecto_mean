import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public cargando: boolean = true;
  public productos: Producto[] = [];
  private imgSubs: Subscription;

  constructor(private productoService: ProductoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarProductos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarProductos());
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.cargando = false;
        this.productos = productos;
      });
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarProductos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {
        // this.productos = resp;
      });
  }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }

  borrarProducto(producto: Producto) {

    Swal.fire({
      title: '¿Borrar producto?',
      text: `Esta a punto de borrar a ${producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.productoService.eliminarProducto(producto._id)
          .subscribe(resp => {

            this.cargarProductos();
            Swal.fire(
              'Médico borrado',
              `${producto.nombre} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }
}
