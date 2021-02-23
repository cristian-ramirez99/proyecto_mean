import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public tipoProductos: TipoProducto[] = [];
  public productosTotales: Producto[] = [];
  public productosMostrados: Producto[] = [];

  private precioMin = 0;
  private precioMax = 999999;
  private tipoProducto = "todo";

  public toogle: boolean[] = [];

  hover: boolean;

  constructor(private productoService: ProductoService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarProductos();

    this.productosMostrados = this.productosTotales;
    this.cargarTipoProductos();

  }
  //Hace peticion GET y obtiene todos los productos
  cargarProductos() {
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.productosTotales = productos;
        this.productosMostrados = productos;
      });

    //PARA PRUEBAS 10 productos
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      1, 'no-image', new TipoProducto('ordenador', 'es bonito'), '1', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      20, 'no-image', new TipoProducto('ordenador', 'es bonito'), '2', 10));
    this.productosTotales.push(new Producto('gráfica', "dsalkdklsa ",
      50, 'no-image', new TipoProducto('gráfica', 'es bonito'), '3', 10));
    this.productosTotales.push(new Producto('tablet', "dsalkdklsa ",
      100, 'no-image', new TipoProducto('tablet', 'es bonito'), '4', 10));
    this.productosTotales.push(new Producto('otros', "dsalkdklsa ",
      200, 'no-image', new TipoProducto('otros', 'es bonito'), '5', 10));
    this.productosTotales.push(new Producto('otros', "dsalkdklsa ",
      300, 'no-image', new TipoProducto('otros', 'es bonito'), '6', 10));
    this.productosTotales.push(new Producto('procesador', "dsalkdklsa ",
      500, 'no-image', new TipoProducto('procesador', 'es bonito'), '7', 10));
    this.productosTotales.push(new Producto('gráfica', "dsalkdklsa ",
      750, 'no-image', new TipoProducto('gráfica', 'es bonito'), '8', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      40, 'no-image', new TipoProducto('ordenador', 'es bonito'), '9', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      1020, 'no-image', new TipoProducto('ordenador', 'es bonito'), '10', 10));
  }
  //Hace peticion GET y obtiene todos los TipoProductos 
  cargarTipoProductos() {
    console.log("Cargando tipo productos");

    this.productoService.cargarTipoProductos()
      .subscribe(tipoProductos => {
        this.tipoProductos = tipoProductos;
        //Añadimo al princip del array el tipoProducto = cualquier producto
        this.tipoProductos.unshift(new TipoProducto('Cualquier producto', '123'));

        //Inicializamos el array que resalta el tipoProducto seleccionado
        this.toogle = new Array(this.tipoProducto.length);

        //Por default mostramos en negrita 'Cualquier producto'
        this.toogle[0] = true;
      })
    //PARA PRUEBAS 
    this.toogle[0] = true;
    this.tipoProductos.push(new TipoProducto('Cualquier producto', '123'));
    this.tipoProductos.push(new TipoProducto('ordenador', '123'));
    this.tipoProductos.push(new TipoProducto('gráfica', '123'));
    this.tipoProductos.push(new TipoProducto('procesador', '123'));
    this.tipoProductos.push(new TipoProducto('tablet', '123'));
    this.tipoProductos.push(new TipoProducto('otros', '123'));
  }

  //Actualiza productosMostrados filtrando el precio
  filtrarProductos() {
    //Si tiene cualquier producto
    if (this.tipoProducto === "Cualquier producto") {
      this.productosMostrados = this.productosTotales.filter(producto => producto.precio >= this.precioMin && producto.precio <= this.precioMax);
      //Si tiene un tipoProducto seleccionado
    } else {
      this.productosMostrados = this.productosTotales.filter(producto =>
        producto.precio >= this.precioMin && producto.precio <= this.precioMax &&
        producto.tipoProducto.nombre === this.tipoProducto);
    }
  }
  setId(id: string) {
    this.productoService.setId(id);
  }

  onTipoProductoChange(tipo: string, index: number) {

    this.tipoProducto = tipo;
    //Vaciamos el array
    this.toogle = [];

    //Ponemos en negrita el selected tipoProducto
    this.toogle[index] = true;

    //Actualizamos mostrarProductos
    this.filtrarProductos();
  }
  //Obenemos dos values separados por ',' el primer parametro es precioMin y el segundo precioMax
  onPrecioChange(value) {
    let auxPos = value.indexOf(',');
    this.precioMin = value.slice(0, auxPos);

    value = value.substring(auxPos + 1, value.length);
    this.precioMax = value;

    //Actualizamos mostrarProductos
    this.filtrarProductos();
  }
  noExisteProductosMostrados() {
    return this.productosMostrados.length == 0;
  }
}
