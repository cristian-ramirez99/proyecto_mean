import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto, TipoProducto } from '../../../../models/producto.model';


import { ProductoService } from '../../../../services/producto.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {


  public productoForm: FormGroup;
  public categoriaForm: FormGroup;

  public productoSeleccionado: Producto;
  public categorias: TipoProducto[] = [];
  public categoriaSeleccionada: TipoProducto;

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //Prueba para ver si existe productoSeleccionado
    //this.productoSeleccionado = (new Producto('ordenador', "dsalkdklsa ",
    //  1, 'no-image', new TipoProducto('ordenador', 'es bonito'), '1', 10));
    /////////////////////
    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProducto(id));

    this.cargarCategorias();

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });


    //Listener onChange categoria 
    this.productoForm.get('categoria').valueChanges
      .subscribe(categoriaNombre => {
        console.log(categoriaNombre);
        this.categoriaSeleccionada = this.categorias.find(c => c.nombre === categoriaNombre);

        this.categoriaForm.setValue({
          nombre: this.categoriaSeleccionada.nombre,
          descripcion: this.categoriaSeleccionada.caracteristicas
        });
      });
  }
  cargarCategorias() {
    this.productoService.cargarTipoProductos()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
    //Borrar esto !!!!!!
    this.categorias.push(new TipoProducto('ordenador', '123'));
    this.categorias.push(new TipoProducto('gráfica', '123'));
    this.categorias.push(new TipoProducto('procesador', '123'));
    this.categorias.push(new TipoProducto('tablet', '123'));
    this.categorias.push(new TipoProducto('otros', '123'));
  }
  cargarProducto(id: string) {
    if (id === 'nuevo') {
      return;
    }

    //Falta pasar por parametro id en cargarProducto(id)
    this.productoService.cargarProducto()
      .pipe(
        delay(100)
      )
      .subscribe(producto => {

        if (!producto) {
          return this.router.navigateByUrl(`/dashboard/productos`);
        }

        const { nombre, descripcion, tipoProducto, precio, cantidad } = producto;
        this.productoSeleccionado = producto;
        this.productoForm.setValue({ nombre, descripcion, tipoProducto, precio, cantidad });
      });

  }

  //Actualizar o crear producto
  guardarProducto() {

    const { nombre } = this.productoForm.value;

    if (this.productoSeleccionado) {
      // actualizar
      const data = {
        ...this.productoForm.value,
        _id: this.productoSeleccionado._id
      }

      this.productoService.actualizarProducto(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        })

    } else {
      // crear
      this.productoService.crearProducto(this.productoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/nuevoProducto/${resp.producto._id}`)
        })
    }
  }
  guardarCategoria() {
    const { nombre } = this.categoriaForm.value;

    let categoriaNueva: Boolean = true;

    this.categorias.forEach(categoria => {
      if (categoria.nombre === nombre) {
        //Modificando categoria 
        console.log("Modificando categoria");
        categoriaNueva = false;
      }
    });

    if (categoriaNueva) {
      console.log("Nueva categoria");
    }
  }
  onChangeNombreCategoria() {
    const { nombre } = this.categoriaForm.value;

    let categoriaNueva: Boolean = true;

    console.log(nombre);
    this.categorias.forEach(categoria => {
      if (categoria.nombre === nombre) {
        //Si es una categoria que existe cambiamos el nombre del button
        document.getElementById("btnCategoria").innerHTML = "Guardar";
        categoriaNueva = false;
      }
    });
    if (categoriaNueva) {
      //Si es una nueva categoria cambiamos el nombre del button
      document.getElementById("btnCategoria").innerHTML = "Crear";
    }
  }
}
