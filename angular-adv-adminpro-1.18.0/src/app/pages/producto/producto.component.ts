import { Component, OnInit } from '@angular/core';
import { Producto, TipoProducto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public cantidadPorUsuario = [1, 2, 3, 4, 5];
  public cantidadSeleccionada: number = 1;

  public producto: Producto = new Producto('ordenador',
    "El oeste de Texas divide la frontera entre Mexico y Nuevo México. Es muy bella pero aspera, llena de cactus, en esta region se encuentran las Davis Mountains. Todo el terreno esta lleno de piedra caliza, torcidos arboles de mezquite y espinosos nopales. Para admirar la verdadera belleza desertica, visite el Parque Nacional de Big Bend, cerca de Brownsville. ",
    14, 'no-image', new TipoProducto('pc', 'es bonito'), 10);
  constructor() { }

  ngOnInit(): void {
  }
  quedaStock() {
    return this.producto.cantidad > 0;
  }
  addAlCarrito() {
    console.log("Añadido al carrito");
  }
}