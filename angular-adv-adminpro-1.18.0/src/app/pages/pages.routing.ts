import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductoComponent } from './producto/producto.component';
import { CarritoDeLaCompraComponent } from './carrito-de-la-compra/carrito-de-la-compra.component';
import { EnvioComponent } from './envio/envio.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { NuevoProductoComponent } from './mantenimientos/productos/nuevo-producto/nuevo-producto.component';




const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'producto/:nombre', component: ProductoComponent, data: { titulo: 'Producto' } },
            { path: 'envío', component: EnvioComponent, data: { titulo: 'Dirección de la entrega' } },

            //Perfil
            { path: 'perfil/pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' } },
            { path: 'perfil/carrito', component: CarritoDeLaCompraComponent, data: { titulo: 'Carrito de la compra' } },

            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' } },
            { path: 'productos', component: ProductosComponent, data: { titulo: 'Mantenimiento de Productos' } },
            { path: 'nuevoProducto/:id', component: NuevoProductoComponent, data: { titulo: 'Mantenimiento de Productos' } },


            // Rutas de Admin
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


