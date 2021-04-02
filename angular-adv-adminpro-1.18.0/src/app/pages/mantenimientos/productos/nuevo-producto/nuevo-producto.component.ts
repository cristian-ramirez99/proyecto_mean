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

    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProducto(id));

    this.cargarCategorias();

    //Listener onChange categoria 
    this.productoForm.get('categoria').valueChanges
      .subscribe(categoriaNombre => {

        //Si no es primera vez
        if (this.categoriaSeleccionada) {
          document.getElementById("btnCategoria").innerHTML = "<i class='fa fa-save'></i> Guardar";
        }

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
    this.categorias.push(new TipoProducto('ordenador', 'Caracteristicas ordenador'));
    this.categorias.push(new TipoProducto('gráfica', 'Caracteristicas grafica'));
    this.categorias.push(new TipoProducto('procesador', 'Caracteristicas procesador'));
    this.categorias.push(new TipoProducto('tablet', 'Caracteristicas tablet'));
    this.categorias.push(new TipoProducto('otros', 'Caracteristicas otros'));
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

        this.productoForm.setValue({
          nombre: nombre,
          descripcion: descripcion,
          categoria: tipoProducto.nombre,
          precio: precio,
          stock: cantidad
        });
      });

    //Borrar !!!
    const p: Producto = (new Producto('ordenador', "dsalkdklsa ",
      1, 'no-image', new TipoProducto('ordenador', 'es bonito'), '1', 10));

    const { nombre, descripcion, precio, cantidad } = p;

    this.productoForm.setValue({
      nombre: nombre,
      descripcion: descripcion,
      categoria: "ordenador",
      precio: precio,
      stock: cantidad
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
      //Borrar !!!
      Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
    } else {
      // crear
      this.productoService.crearProducto(this.productoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/nuevoProducto/${resp.producto._id}`)
        })
      //Borrar !!!
      Swal.fire('Creado', `${nombre} creado correctamente`, 'success');

    }
  }
  guardarCategoria() {
    const { nombre } = this.categoriaForm.value;

    let isCategoriaNueva: Boolean = true;

    for (let i = 0; this.categorias.length > i; i++) {
      if (this.categorias[i].nombre === nombre) {
        //Modificando categoria 
        console.log("Modificando categoria");
        isCategoriaNueva = false;

        //PUT modificarTipoProducto
        this.productoService.modificarTipoProducto(this.categorias[i])
          .subscribe((resp: any) => {
            Swal.fire('Actualizado', `Categoria ${nombre} actualizada correctamente`, 'success');
            this.categorias[i].caracteristicas = this.categoriaForm.value.descripcion;
          })
        //Borrar !!!!!!!
        Swal.fire('Actualizado', `Categoria ${nombre} actualizada correctamente`, 'success');
        this.categorias[i].caracteristicas = this.categoriaForm.value.descripcion;

      }
    }

    //Crear nueva categoria
    if (isCategoriaNueva) {
      console.log("Nueva categoria");
      this.productoService.crearTipoProducto(this.categoriaForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', ` Categoria ${nombre} creada correctamente`, 'success');

          //Añadimos la nueva categoria al array
          this.categorias.push(new TipoProducto(nombre, this.categoriaForm.value.descripcion));
        })
      //Borrar !!!!!!!
      Swal.fire('Creado', ` Categoria ${nombre} creada correctamente`, 'success');
      this.categorias.push(new TipoProducto(nombre, this.categoriaForm.value.descripcion));

    }
  }
  onChangeNombreCategoria() {
    const { nombre } = this.categoriaForm.value;

    let isCategoriaNueva: Boolean = true;

    this.categorias.forEach(categoria => {
      console.log(categoria.nombre);
      if (categoria.nombre === nombre) {
        //Si es una categoria que existe cambiamos el nombre del button
        document.getElementById("btnCategoria").innerHTML = "<i class='fa fa-save'></i> Guardar";
        isCategoriaNueva = false;
      }
    });
    if (isCategoriaNueva) {
      //Si es una nueva categoria cambiamos el nombre del button
      document.getElementById("btnCategoria").innerHTML = "<i class='fa fa-plus-square' aria-hidden='true'></i> Crear";
    }
  }
}
