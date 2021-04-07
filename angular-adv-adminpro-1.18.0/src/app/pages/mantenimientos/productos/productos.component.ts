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
  private imgSubs: Subscription;

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
    this.cargando = false;
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.cargando = false;
        this.productosTotales = productos;
        this.productosMostrados = productos;
      });
  }

  //Hace peticion GET y obtiene todos los TipoProductos 
  cargarTipoProductos() {
    console.log("Cargando tipo productos");

    this.productoService.cargarTipoProductos()
      .subscribe(tipoProductos => {
        console.log(tipoProductos);
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
      .subscribe(resp => {
        // this.productos = resp;
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
    console.log(nombreCategoria);
    //Si tiene cualquier producto
    if (nombreCategoria === "Cualquier producto") {
      this.productosMostrados = this.productosTotales;
    } else {
      this.productosMostrados = this.productosTotales.filter(producto => producto.tipoProducto.nombre === nombreCategoria);
    }
  }
}
