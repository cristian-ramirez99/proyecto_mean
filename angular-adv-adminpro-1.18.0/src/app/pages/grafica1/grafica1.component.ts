import { Component, OnInit } from '@angular/core';
import { estado } from 'src/app/global/estado';
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

  lineaPedidos = [];

  cantidadProducto: number[] = [];
  precioProducto: number[] = [];

  cantidadTipoProducto: number[] = [];
  precioTipoProducto: number[] = [];

  public productos: string[] = [];
  public tipoProductos: string[] = [];
  public tipoProductosId: string[] = [];

  public dataProductoPrecio = [];
  public dataProductoCantidad = [];
  public dataTipoProductoPrecio = [];
  public dataTipoProductoCantidad = [];

  constructor(private estadisticasService: EstadisticasService,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.getLineaPedidos();
    this.getTipoProductos()
    this.getProductos();
  }

  //Peticion http que te da todas las lineaPedidos
  getLineaPedidos() {
    this.estadisticasService.getEstadisticas()
      .subscribe((lineaPedidos: LineaPedido[]) => {
        this.lineaPedidos = lineaPedidos;
        this.calcularEstadisticasProductos();
        this.calcularEstadisticasTipoProductos();

      });
  }
  //Peticion http para obtener el id de los tipoProductos
  getTipoProductos() {
    this.productoService.cargarTipoProductos()
      .subscribe((tipoProductos: TipoProducto[]) => {
        this.dataTipoProductoPrecio.length = tipoProductos.length;
        this.dataTipoProductoCantidad.length = tipoProductos.length;


        //Llenamos array de 0
        this.cantidadTipoProducto = new Array(tipoProductos.length).fill(0);
        this.precioTipoProducto = new Array(tipoProductos.length).fill(0);

        for (let i = 0; tipoProductos.length > i; i++) {
          this.tipoProductos[i] = tipoProductos[i].nombre;
          this.tipoProductosId[i] = tipoProductos[i]._id;
        }
      })
  }

  //Peticion http para obtener el nombre de todos los productos
  getProductos() {
    this.productoService.cargarProductos(filtro.filtroNombre)
      .subscribe((productos: Producto[]) => {
        this.dataProductoPrecio.length = productos.length;
        this.dataProductoCantidad.length = productos.length;

        //Llenamos array de 0
        this.cantidadProducto = new Array(productos.length).fill(0);
        this.precioProducto = new Array(productos.length).fill(0);


        for (let i = 0; productos.length > i; i++) {
          this.productos[i] = productos[i].nombre;
        }
      })
  }

  //Calcula la cantidad y la facturación de todos los productos
  calcularEstadisticasProductos() {
    for (let i = 0; this.lineaPedidos.length > i; i++) {
      for (let j = 0; this.dataProductoPrecio.length > j; j++) {

        //Si coincide el nombre de lineaPedido con un producto
        if (this.lineaPedidos[i].producto != null && this.lineaPedidos[i].pedido != null && this.lineaPedidos[i].pedido.estado !== estado.temporal &&
          this.productos[j] === this.lineaPedidos[i].producto.nombre) {

          //Añdimos la cantidad correspondiente al producto 
          this.cantidadProducto[j] += this.lineaPedidos[i].cantidad;

          //Añdimos precio correspondiente al producto 
          this.precioProducto[j] += this.lineaPedidos[i].producto.precio * this.lineaPedidos[i].cantidad;
          break;
        }
      }
    }
    //Actualizamos los datos de la gráfica 
    this.dataProductoPrecio = [this.precioProducto];
    this.dataProductoCantidad = [this.cantidadProducto];
  }
  calcularEstadisticasTipoProductos() {

    for (let i = 0; this.lineaPedidos.length > i; i++) {
      for (let j = 0; this.dataTipoProductoPrecio.length > j; j++) {

        //Si coincide el id de lineaPedido con un tipoProducto
        if (this.lineaPedidos[i].producto != null && this.lineaPedidos[i].pedido != null && this.lineaPedidos[i].pedido.estado !== estado.temporal &&
          this.tipoProductosId[j] === this.lineaPedidos[i].producto.tipoProducto) {

          //Añdimos la cantidad correspondiente al tipoProducto 
          this.cantidadTipoProducto[j] += this.lineaPedidos[i].cantidad;

          //Añdimos el precio correspondiente al tipoProducto 
          this.precioTipoProducto[j] += this.lineaPedidos[i].producto.precio * this.lineaPedidos[i].cantidad;
          break;
        }
      }
    }
    //Actualizamos los datos de la gráfica 
    this.dataTipoProductoPrecio = [this.precioTipoProducto];
    this.dataTipoProductoCantidad = [this.cantidadTipoProducto];
  }
}
