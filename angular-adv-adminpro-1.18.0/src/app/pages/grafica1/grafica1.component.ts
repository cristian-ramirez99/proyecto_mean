import { Component, OnInit } from '@angular/core';
import { filtro } from 'src/app/global/filtroProducto';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { ProductoService } from 'src/app/services/producto.service';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  lineaPedidos: LineaPedido[] = [];
  cantidadProducto: number[] = [];
  cantidadPrecio: number[] = [];
  cantidadTipoProducto: number[] = [];
  cantidadTipoPrecio: number[] = [];

  public productos: string[] = [];
  public tipoProductos: string[] = [];
  public dataProductoPrecio = [];
  public dataProductoCantidad = [];
  public datosTipoProductoPrecio = [];
  public datosTipoProductoCantidad = [];

  constructor(private estadisticasService: EstadisticasService,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.getEstadisticas();
    this.getTipoProductos()
    this.getProductos();
  }

  getEstadisticas() {
    this.estadisticasService.getEstadisticas()
      .subscribe((lineaPedidos: LineaPedido[]) => {
        this.lineaPedidos = lineaPedidos;
        this.calcularEstadisticasProductos();
        this.calcularEstadisticasTipoProductos();
      });
  }
  getTipoProductos() {
    this.productoService.cargarTipoProductos()
      .subscribe((tipoProductos: TipoProducto[]) => {
        this.dataProductoPrecio.length = tipoProductos.length;
        this.dataProductoCantidad.length = tipoProductos.length;


        //Llenamos array de 0
        this.cantidadTipoProducto = new Array(tipoProductos.length).fill(0);
        this.cantidadTipoPrecio = new Array(tipoProductos.length).fill(0);

        for (let i = 0; tipoProductos.length > i; i++) {
          this.productos[i] = tipoProductos[i].nombre;
        }
      })
  }

  getProductos() {
    this.productoService.cargarProductos(filtro.filtroNombre)
      .subscribe((productos: Producto[]) => {
        this.dataProductoPrecio.length = productos.length;
        this.dataProductoCantidad.length = productos.length;

        //Llenamos array de 0
        this.cantidadProducto = new Array(productos.length).fill(0);
        this.cantidadPrecio = new Array(productos.length).fill(0);


        for (let i = 0; productos.length > i; i++) {
          this.productos[i] = productos[i].nombre;
        }
      })
  }

  calcularEstadisticasProductos() {
    for (let i = 0; this.lineaPedidos.length > i; i++) {
      for (let j = 0; this.dataProductoPrecio.length > j; j++) {
        if (this.lineaPedidos[i].producto != null && this.productos[j] === this.lineaPedidos[i].producto.nombre) {
          this.cantidadProducto[j] += this.lineaPedidos[i].cantidad;
          this.cantidadPrecio[j] += this.lineaPedidos[i].producto.precio * this.lineaPedidos[i].cantidad;
          break;
        }
      }
    }
    this.dataProductoPrecio = [this.cantidadPrecio];
    this.dataProductoCantidad = [this.cantidadProducto];
  }
  calcularEstadisticasTipoProductos() {
    for (let i = 0; this.lineaPedidos.length > i; i++) {
      for (let j = 0; this.dataProductoPrecio.length > j; j++) {
        if (this.lineaPedidos[i].producto != null && this.lineaPedidos[i].producto.tipoProducto != null &&
          this.productos[j] === this.lineaPedidos[i].producto.tipoProducto.nombre) {
          this.cantidadTipoProducto[j] += this.lineaPedidos[i].cantidad;
          this.cantidadTipoPrecio[j] += this.lineaPedidos[i].producto.precio * this.lineaPedidos[i].cantidad;
          break;
        }
      }
    }
    this.datosTipoProductoPrecio = [this.cantidadTipoPrecio];
    this.datosTipoProductoCantidad = [this.cantidadTipoPrecio];
  }
}
