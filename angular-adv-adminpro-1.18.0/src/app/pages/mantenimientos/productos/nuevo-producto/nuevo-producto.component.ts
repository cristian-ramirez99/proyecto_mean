import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto, TipoProducto } from '../../../../models/producto.model';


import { ProductoService } from '../../../../services/producto.service';
import { delay } from 'rxjs/operators';
import { filtro } from '../../../../global/filtroProducto';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {


  public productoForm: FormGroup;
  public tipoProductoForm: FormGroup;

  public productoSeleccionado: Producto;
  public tipoProductos: TipoProducto[] = [];
  public tipoProductoSeleccionado: TipoProducto;

  //Por problemas por async lo almaceno como global
  public productos: Producto[] = [];

  private formSubmitted: boolean = false;

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTipoProductos();

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.tipoProductoForm = this.fb.group({
      nombre: ['', Validators.required],
      caracteristicas: ['', Validators.required]
    });

    //Obtiene el id del url
    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProducto(id));

    this.onChangeTipoProducto();

    this.cargarProductos();
  }
  async cargarTipoProductos() {
    this.productoService.cargarTipoProductos()
      .subscribe(tipoProducto => {
        this.tipoProductos = tipoProducto;
      });
  }

  //Si estamos modificando un producto existente, hacemos peticion http para cargar el producto y mostrarlo al usuario
  cargarProducto(id: string) {
    if (id === 'nuevo') {
      return;
    }

    //GET producto
    this.productoService.cargarProducto(id)
      .pipe(
        delay(100)
      )
      .subscribe(producto => {

        //Si el producto no existiera volveria a productos
        if (!producto) {
          return this.router.navigateByUrl(`/dashboard/productos`);
        }

        const { nombre, descripcion, tipoProducto, precio, stock } = producto;
        this.productoSeleccionado = producto;

        //Mostramos al usuario el producto cargado
        this.productoForm.setValue({
          nombre: nombre,
          descripcion: descripcion,
          tipoProducto: tipoProducto._id,
          precio: precio,
          stock: stock
        });
      });
  }

  //Hace peticion http para crear o modificar producto dependiendo de si ya exite el producto.
  guardarProducto() {
    this.formSubmitted = true;

    //Control de errores
    if (this.stockNoValido()) {
      return;
    }

    const { nombre } = this.productoForm.value;

    //Si existe producto
    if (this.productoSeleccionado) {
      //Actualizar producto

      const data = {
        ...this.productoForm.value,
        _id: this.productoSeleccionado._id
      }

      console.log(data);
      
      this.productoService.actualizarProducto(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        });

      //Si el producto todavia no existe
    } else {
      //Crear producto
      this.productoService.crearProducto(this.productoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/nuevoProducto/${resp.producto._id}`)
        });
    }
  }

  //Hace peticion para crear un nuevo tipoProducto
  crearTipoProducto() {
    const { nombre } = this.tipoProductoForm.value;

    this.productoService.crearTipoProducto(this.tipoProductoForm.value)
      .subscribe(resp => {
        Swal.fire('Creado', ` Tipo producto ${nombre} creado correctamente`, 'success');
        this.cargarTipoProductos();
      })
  }

  //Hace peticion http para actualizar el tipoProducto
  actualizarTipoProducto() {
    const { nombre } = this.tipoProductoForm.value;

    const data = {
      ...this.tipoProductoForm.value,
      _id: this.tipoProductoSeleccionado._id
    }

    //PUT modificarTipoProducto
    this.productoService.modificarTipoProducto(data)
      .subscribe((resp: any) => {
        Swal.fire('Actualizado', `Tipo producto ${nombre} actualizado correctamente`, 'success');
        this.cargarTipoProductos();
      })
  }

  //Devuelve true si el nombre de tipoProducto no coincide con ninguno tipoProducto ya existente
  isTipoProductoNuevo() {
    const { nombre } = this.tipoProductoForm.value;

    for (let i = 0; this.tipoProductos.length > i; i++) {
      //Existe tipoProducto con mismo nombre
      if (this.tipoProductos[i].nombre === nombre) {
        return false;
      }
    }
    return true;
  }

  /*Hace peticion http para eliminar tipoProducto*/
  async eliminarTipoProducto() {
    const { tipoProducto } = this.productoForm.value;

    //Miramos si algun produto tiene ese tipoProducto
    const borrarProducto = this.tipoProductoNoPerteneceANingunProducto(tipoProducto);

    console.log(borrarProducto);

    //Si ningun producto tiene ese tipoProducto, borramos el tipoProducto
    if (borrarProducto) {
      this.productoService.eliminarTipoProducto(tipoProducto)
        .subscribe(resp => {
          Swal.fire('Eliminado', 'Tipo producto eliminado correctamente', 'success');
          this.tipoProductoSeleccionado = null;
          this.cargarTipoProductos();
        })

      //Si algun producto tiene ese tipoProducto mostramos mensaje de error
    } else {
      Swal.fire('Error', 'Tipo producto pertenece a algun producto', 'error');
    }
  }

  //Devuelve true si ningun producto tiene ese tipoProducto
  tipoProductoNoPerteneceANingunProducto(id: string): boolean {
    let istipoProductoBorrable: boolean = true;

    this.productos.forEach(producto => {
      //Si algun producto tiene ese tipoProducto
      if (producto.tipoProducto._id === id) {
        istipoProductoBorrable = false;
      }
    });
    return istipoProductoBorrable;
  }

  /*Hace peticion http para obtener los productos*/
  cargarProductos() {
    this.productoService.cargarProductos(filtro.filtroNombre)
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
      })
  }

  onChangeTipoProducto() {
    this.productoForm.get('tipoProducto').valueChanges
      .subscribe(id => {

        //Si productoSeleccionado
        if (this.tipoProductoSeleccionado) {
          document.getElementById("btnTipoProducto").innerHTML = "<i class='fa fa-save'></i> Guardar";
        }

        this.tipoProductoSeleccionado = this.tipoProductos.find(c => c._id === id);

        //Mostramos al usuario el tipoProducto
        this.tipoProductoForm.setValue({
          nombre: this.tipoProductoSeleccionado.nombre,
          caracteristicas: this.tipoProductoSeleccionado.caracteristicas
        });
      });
  }

  //Si stock es un entero devuelve true
  stockNoValido(): boolean {
    const { stock } = this.productoForm.value;

    return stock % 1 != 0 && this.formSubmitted;

  }
}
