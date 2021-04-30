import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { ProductoService } from '../../services/producto.service';

import { filtro } from '../../global/filtroProducto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

  readonly filtro = filtro;

  public tipoProductos: TipoProducto[] = [];
  public cantidadTipoProductos: number[] = [];

  public productosTotales: Producto[] = [];
  public productosMostrados: Producto[] = [];

  private precioMin = 0;
  private precioMax = 999999;
  private tipoProducto = "todo";

  public toggleTipoProducto: boolean[] = [];
  public toggleFiltroProducto: boolean[] = [false, true, false, false];

  constructor(private productoService: ProductoService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarTipoProductos();
    this.cargarProductos(false, filtro.filtroNombre);

  }
  //Hace peticion GET y obtiene todos los productos
  cargarProductos(hacerToggle: boolean, filtro: number) {
    this.productoService.cargarProductos(filtro)
      .subscribe(productos => {
        //Vaciamo el array 
        this.toggleTipoProducto = [];

        //Por default mostramos en negrita 'Cualquier producto'
        this.toggleTipoProducto[0] = true;

        this.productosTotales = productos;
        this.productosMostrados = productos;
        if (hacerToggle) {
          this.toggleFiltro(filtro);
        }
        this.calcularCantidadTipoProducto(this.precioMin, this.precioMax);

      });
  }

  //Hace peticion GET y obtiene todos los TipoProductos 
  cargarTipoProductos() {
    this.productoService.cargarTipoProductos()
      .subscribe(tipoProductos => {
        this.tipoProductos = tipoProductos;

        //Añadimo al princip del array el tipoProducto = cualquier producto
        this.tipoProductos.unshift(new TipoProducto('Cualquier producto', ''));

        //Inicializamos el array que resalta el tipoProducto seleccionado
        this.toggleTipoProducto = new Array(this.tipoProducto.length);
      })
  }

  calcularCantidadTipoProducto(precioMin: number, precioMax: number) {
    //Inicializamos el array y ponemos todos los valores a 0
    this.cantidadTipoProductos = new Array(this.tipoProductos.length);
    this.cantidadTipoProductos = this.cantidadTipoProductos.fill(0);

    //Añadimos la canitdad de cualquier tipo de producto
    for (let i = 0; this.productosTotales.length > i; i++) {
      if (this.productosTotales[i].precio >= precioMin && this.productosTotales[i].precio <= precioMax) {
        this.cantidadTipoProductos[0]++;

      }
    }

    //Calculamos la cantidad de tipoProductos que hay
    for (let i = 0; this.productosTotales.length > i; i++) {
      for (let j = 1; this.tipoProductos.length > j; j++) {

        if (this.tipoProductos[j].nombre === this.productosTotales[i].tipoProducto.nombre &&
          this.productosTotales[i].precio >= precioMin && this.productosTotales[i].precio <= precioMax) {
          this.cantidadTipoProductos[j]++;
        }
      }
    }
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
    this.toggleTipoProducto = [];

    //Ponemos en negrita el selected tipoProducto
    this.toggleTipoProducto[index] = true;

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
    this.calcularCantidadTipoProducto(this.precioMin, this.precioMax);
  }
  noExisteProductosMostrados() {
    return this.productosMostrados.length == 0;
  }
  toggleFiltro(pos: number) {
    if (this.toggleFiltroProducto[pos]) {
      //Vaciamos el array
      this.toggleFiltroProducto = [];

      this.toggleFiltroProducto[pos + 1] = true;
      this.productosMostrados.reverse()

    } else {
      //Vaciamos el array
      this.toggleFiltroProducto = [];

      this.toggleFiltroProducto[pos] = true;
    }
  }
}
