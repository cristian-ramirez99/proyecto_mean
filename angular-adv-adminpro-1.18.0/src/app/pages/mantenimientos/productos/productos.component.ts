import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';


import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public cargando: boolean = true;
  public productosTotales: Producto[] = [];
  public productosMostrados: Producto[] = [];
  public tipoProductos: TipoProducto[] = [];
  public imgSubs: Subscription;

  private nombreTipoProductoSeleccionado: String = "Cualquier producto";

  constructor(private productoService: ProductoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarTipoProductos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarProductos());
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.cargando = false;
        this.productosTotales = productos;
        this.productosMostrados = productos;
      });
  }

  //Hace peticion GET y obtiene todos los TipoProductos 
  cargarTipoProductos() {

    this.productoService.cargarTipoProductos()
      .subscribe(tipoProductos => {
        this.tipoProductos = tipoProductos;

        //Añadimo al princip del array el tipoProducto = cualquier producto
        this.tipoProductos.unshift(new TipoProducto('Cualquier producto', ''));
      })
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarProductos();
    }

    this.busquedasService.buscar('productos', termino)
      .subscribe((resp: any) => {
        if (this.nombreTipoProductoSeleccionado === "Cualquier producto") {
          this.productosMostrados = resp;
        } else {
          this.productosMostrados = resp.filter(producto => producto.tipoProducto.nombre === this.nombreTipoProductoSeleccionado);
        }
      });
  }

  abrirModal(producto: Producto) {
    this.modalImagenService.abrirModal('productos', producto._id, producto.img);
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
              'Producto borrado',
              `${producto.nombre} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })
  }
  cambiarCategoria(nombreCategoria: String) {
    //Si tiene cualquier producto
    if (nombreCategoria === "Cualquier producto") {
      this.productosMostrados = this.productosTotales;
      this.nombreTipoProductoSeleccionado = "Cualquier producto";

    } else {
      this.nombreTipoProductoSeleccionado = nombreCategoria;
      this.productosMostrados = this.productosTotales.filter(producto => producto.tipoProducto.nombre === nombreCategoria);
    }
  }
}
