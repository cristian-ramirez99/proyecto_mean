import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.mode';
import { Producto } from 'src/app/models/producto.model';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';

import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public cantidadPorUsuario = [1, 2, 3, 4, 5];
  public cantidadSeleccionada: number = 1;

  public producto: Producto;
  public lineaPedido: LineaPedido;
  public idPedido: string;

  constructor(private productoService: ProductoService,
    public pedidoService: PedidoService,
    public lineaPedidoService: LineaPedidoService,
    public usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Obtiene el id por url
    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProducto(id));
  }
  cargarProducto(id: string) {
    this.productoService.cargarProducto(id)
      .subscribe(producto => {
        this.producto = producto;
      })
  }

  //Devuelve true si no queda stock del producto
  quedaStock() {
    return this.producto.stock > 0;
  }

  /*Hace peticion http para añadir una nueva lineaPedido al pedidoTemporal*/
  async addAlCarrito() {
    if (this.producto.stock >= this.cantidadSeleccionada) {
      //Si no existe pedidoTemp para ese usuario lo creamos

      const uid = this.usuarioService.uid;

      //CargarPedioTemp
      await this.pedidoService.cargarPedidoTemp(uid)
        .toPromise().
        then((data: any) => {
          if (data !== null) {
            const { _id } = data;
            this.idPedido = _id;
          }
        })

      //Si no exitste pedidoTemp
      if (!this.idPedido) {

        const pedidoTemp: Pedido = new Pedido('temporal', this.usuarioService.uid);

        //Crear pedidoTemp
        await this.pedidoService.crearPedido(pedidoTemp)
          .toPromise()
          .then((data: any) => {
            const { pedido } = data
            this.idPedido = pedido._id;
          });

      }

      const data = {
        producto: this.producto._id,
        pedido: this.idPedido,
        cantidad: this.cantidadSeleccionada
      }

      //Creamos linea de pedido con el id pedido
      this.lineaPedidoService.crearLineaPedido(data)
        .subscribe(resp => {
          Swal.fire('Accion realizada con éxito', 'Producto añadido al carrito', 'success');
        })

      //Modificamos el stock del producto
      this.producto.stock -= this.cantidadSeleccionada;

      const { nombre, descripcion, precio, stock, _id } = this.producto;

      const producto = {
        nombre,
        descripcion,
        precio,
        stock,
        _id,
        tipoProducto: this.producto.tipoProducto._id
      }

      //Modificamos el stock en la BBDD
      this.productoService.actualizarProducto(producto)
        .subscribe(resp => {
        })

      //Si no queda stock o cantidad>stock
    } else {
      Swal.fire('Error', 'No queda suficiente stock para la cantidad seleccionada', 'error');
    }
  }

  //Cambia la cantidadSelecionada del producto
  setCantidadSeleccionada(newCantidad: number) {
    this.cantidadSeleccionada = newCantidad;
  }
}