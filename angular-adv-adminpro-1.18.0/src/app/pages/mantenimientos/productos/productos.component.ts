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
    this.cargando = false;
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.cargando = false;
        this.productos = productos;
      });
    this.productos.push(new Producto('ordenador', "dsalkdklsa ",
      1, 'no-image', new TipoProducto('ordenador', 'es bonito'), '1', 10));
    this.productos.push(new Producto('ordenador', "dsalkdklsa ",
      20, 'no-image', new TipoProducto('ordenador', 'es bonito'), '2', 10));
    this.productos.push(new Producto('gráfica', "dsalkdklsa ",
      50, 'no-image', new TipoProducto('gráfica', 'es bonito'), '3', 10));
    this.productos.push(new Producto('tablet', "dsalkdklsa ",
      100, 'no-image', new TipoProducto('tablet', 'es bonito'), '4', 10));
    this.productos.push(new Producto('otros', "dsalkdklsa ",
      200, 'no-image', new TipoProducto('otros', 'es bonito'), '5', 10));
    this.productos.push(new Producto('otros', "dsalkdklsa ",
      300, 'no-image', new TipoProducto('otros', 'es bonito'), '6', 10));
    this.productos.push(new Producto('procesador', "dsalkdklsa ",
      500, 'no-image', new TipoProducto('procesador', 'es bonito'), '7', 10));
    this.productos.push(new Producto('gráfica', "dsalkdklsa ",
      750, 'no-image', new TipoProducto('gráfica', 'es bonito'), '8', 10));
    this.productos.push(new Producto('ordenador', "dsalkdklsa ",
      40, 'no-image', new TipoProducto('ordenador', 'es bonito'), '9', 10));
    this.productos.push(new Producto('ordenador', "dsalkdklsa ",
      1020, 'no-image', new TipoProducto('ordenador', 'es bonito'), '10', 10));
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
}
