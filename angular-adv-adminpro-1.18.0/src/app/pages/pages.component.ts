import { Component, OnInit } from '@angular/core';
import { filtro } from '../global/filtroProducto';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/producto.service';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();

const minStock = 7;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(private settingsService: SettingsService,
    private sidebarService: SidebarService,
    private productoService: ProductoService) { }

  async ngOnInit(): Promise<void> {
    customInitFunctions();
    this.sidebarService.cargarMenu();

    await this.productoService.cargarProductos(filtro.filtroStock)
      .toPromise()
      .then((producto: Producto[]) => {
        //Estaria ordenado de menor a mayor cantidad de stock
        this.productos = producto;
      })

    this.productosConStockPorDebajoDeMinimo();
  }

  //Hace peticion http para actualizar el stock automaticamente. Si ya se habia pedido más stock no hace nada. 
  reabastacerAutomaticoStock(id: string) {

    const data = {
      minStock
    }

    this.productoService.reabastecimientoAutomaticoStockDelProducto(id, data)
      .subscribe()
  }

  /*Comprueba que no haya productos con stock por debajo del minimo*/
  productosConStockPorDebajoDeMinimo() {
    //Estaria ordenado de menor a mayor cantidad de stock el array productos 
    for (let i = 0; this.productos.length > i; i++) {
      if (this.productos[i].stock <= minStock) {
        //Hace peticion para reabastecer stock
        this.reabastacerAutomaticoStock(this.productos[i]._id);
      } else {
        //Sale del bucle al encontrar un stock mayor al minStock
        break;
      }
    }
  }
}
