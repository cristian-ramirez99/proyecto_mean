import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, TipoProducto } from 'src/app/models/producto.model';
import { ProductoService } from '../../services/producto.service';

import { filtro } from '../../global/filtroProducto';

const EURO = "\u20AC";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

  readonly filtro = filtro;

  public tipoProductos: TipoProducto[] = [];
  public filtrosPrecio = [
    { name: "Cualquier precio", value: "0,999999", checked: true },
    { name: "5" + EURO + " - 50 " + EURO, value: "5,50", checked: false },
    { name: "50" + EURO + " - 200 " + EURO, value: "50,200", checked: false },
    { name: "200" + EURO + " - 500 " + EURO, value: "200,500", checked: false },
    { name: "500" + EURO + " - 1000 " + EURO, value: "500,1000", checked: false },
    { name: " 1000" + EURO + " > ", value: "1000,999999", checked: false }
  ];
  public cantidadTipoProductos: number[] = [];

  public productosTotales: Producto[] = [];
  public productosMostrados: Producto[] = [];

  private precioMin = 0;
  private precioMax = 999999;
  private tipoProducto = "Cualquier producto";

  public toggleTipoProducto: boolean[] = [];
  public toggleFiltroProducto: boolean = true;
  public cargando: boolean = true;

  constructor(private productoService: ProductoService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarTipoProductos();
    this.cargarProductos(false);

  }
  //Hace peticion GET y obtiene todos los productos
  cargarProductos(hacerToggle: boolean) {
    this.cargando = true;

    this.productoService.cargarProductos(filtro.filtroPrecio)
      .subscribe(productos => {
        this.cargando = false;

        //Vaciamo el array 
        this.toggleTipoProducto = [];

        //Por default mostramos en negrita 'Cualquier producto'
        this.toggleTipoProducto[0] = true;

        this.productosTotales = productos;
        this.productosMostrados = productos;

        if (hacerToggle) {
          this.toggleFiltro();
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

  //onChange el filtro tipoProducto
  onTipoProductoChange(tipo: string, index: number) {
    this.tipoProducto = tipo;

    //Vaciamos el array
    this.toggleTipoProducto = [];

    //Ponemos en negrita el selected tipoProducto
    this.toggleTipoProducto[index] = true;

    //Actualizamos mostrarProductos
    this.filtrarProductos();
  }

  //Checkea el filtro precio pasado por parámetro 
  checkFiltroPrecio(value) {
    this.filtrosPrecio.forEach(fp => {
      if (fp.value === value) {
        fp.checked = true;
      } else {
        fp.checked = false;

      }
    });
  }

  //Obtiene el precio minimo y maximo del filtro precio
  setPrecioMinYMax(value) {
    const precios = value.split(',');

    this.precioMin = precios[0];
    this.precioMax = precios[1];
  }
  //onChange el filtro precio
  onPrecioChange(value) {
    this.checkFiltroPrecio(value);

    this.setPrecioMinYMax(value);

    //Actualizamos mostrarProductos
    this.filtrarProductos();
    this.calcularCantidadTipoProducto(this.precioMin, this.precioMax);
  }

  //Devuelve true si no existe productos que mostrar con los filtro seleccionados 
  noExisteProductosMostrados() {
    if (this.cargando) {
      return false;
    }
    return this.productosMostrados.length == 0;
  }

  toggleFiltro() {
    //Invertimos el valor de toggleFiltroProducto
    this.toggleFiltroProducto = !this.toggleFiltroProducto;

    //Check 'Cualquier precio'
    if (!this.filtrosPrecio[0].checked) {
      this.setPrecioMinYMax(this.filtrosPrecio[0].value);
      this.checkFiltroPrecio(this.filtrosPrecio[0].value);
    }

    if (!this.toggleFiltroProducto) {
      //Invertimos el array
      this.productosMostrados.reverse();
    }

  }
}
