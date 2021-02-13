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

  hover:boolean;
  
  constructor(private productoService: ProductoService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarProductos();

    this.productosMostrados = this.productosTotales;
    this.cargarTipoProductos();

  }
  //Hace peticion GET y obtiene todos los productos
  cargarProductos() {
    console.log("Cargando productos");
    this.productoService.cargarProductos()
      .subscribe(productos => {
        this.productosTotales = productos;
        this.productosMostrados = productos;
      });

    //PARA PRUEBAS 10 productos
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('ordenador', 'es bonito'), '1', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('ordenador', 'es bonito'), '2', 10));
    this.productosTotales.push(new Producto('gráfica', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('gráfica', 'es bonito'), '3', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('tablet', 'es bonito'), '4', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('otros', 'es bonito'), '5', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('otros', 'es bonito'), '6', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('procesador', 'es bonito'), '7', 10));
    this.productosTotales.push(new Producto('gráfica', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('gráfica', 'es bonito'), '8', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('ordenador', 'es bonito'), '9', 10));
    this.productosTotales.push(new Producto('ordenador', "dsalkdklsa ",
      14, 'no-image', new TipoProducto('ordenador', 'es bonito'), '10', 10));
  }
  //Hace peticion GET y obtiene todos los TipoProductos 
  cargarTipoProductos() {
    console.log("Cargando tipo productos");

    this.productoService.cargarTipoProductos()
      .subscribe(tipoProductos => {
        this.tipoProductos = tipoProductos;
      })
    //PARA PRUEBAS 
    this.tipoProductos.push(new TipoProducto('ordenador', '123'));
    this.tipoProductos.push(new TipoProducto('gráfica', '123'));
    this.tipoProductos.push(new TipoProducto('procesador', '123'));
    this.tipoProductos.push(new TipoProducto('tablet', '123'));
    this.tipoProductos.push(new TipoProducto('otros', '123'));
  }
  //Carga el array productosMostrados con el tipo pasado por parametro
  mostrarTipo(tipo: string) {
    this.productosMostrados = [];
    this.productosTotales.forEach(producto => {
      if (producto.tipoProducto.nombre === tipo) {
        this.productosMostrados.push(producto);
      }
    });
  }
  filtrarPrecio(){

  }

}
