import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductoComponent } from './producto/producto.component';
import { CarritoDeLaCompraComponent } from './carrito-de-la-compra/carrito-de-la-compra.component';
import { EnvioComponent } from './envio/envio.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { NuevoProductoComponent } from './mantenimientos/productos/nuevo-producto/nuevo-producto.component';
import { MainPageComponent } from './beforeauth/main-page/main-page.component';
import { AboutUsComponent } from './beforeauth/about-us/about-us.component';
import { ConfirmarEnvioComponent } from './confirmar-envio/confirmar-envio.component';
import { SitemaPagosComponent } from './sitema-pagos/sitema-pagos.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { ShopPageComponent } from './beforeauth/shop-page/shop-page.component';
import { PedidosPorIdComponent } from './mantenimientos/pedidos-por-id/pedidos-por-id.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'producto/:id', component: ProductoComponent, data: { titulo: 'Producto' } },
            { path: 'confirmarEnvio', component: ConfirmarEnvioComponent, data: { titulo: 'Direccion de la entrega' } },
            { path: 'sistemaPagos', component: SitemaPagosComponent, data: { titulo: 'Sistema de pago' } },

            //Perfil
            { path: 'perfil/pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' } },
            { path: 'perfil/carrito', component: CarritoDeLaCompraComponent, data: { titulo: 'Carrito de la compra' } },
            { path: 'perfil/envio', component: EnvioComponent, data: { titulo: 'Dirección de la entrega' } },
            { path: 'perfil/tarjetaCredito', component: TarjetaCreditoComponent, data: { titulo: 'Tarjeta de crédito' } },


            // Mantenimientos (ADMIN_ROLE)
            { path: 'productos', canActivate: [AdminGuard], component: ProductosComponent, data: { titulo: 'Mantenimiento de Productos' } },
            { path: 'nuevoProducto/:id', canActivate: [AdminGuard], component: NuevoProductoComponent, data: { titulo: 'Mantenimiento de Productos' } },
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' } },
            { path: 'pedidos/:id', canActivate: [AdminGuard], component: PedidosPorIdComponent, data: { titulo: 'Mantenimiento de Pedidos' } },

            //Estadisticas (ADMIN_ROLE)
            { path: 'grafica1', canActivate: [AdminGuard], component: Grafica1Component, data: { titulo: 'Gráficas' } },


        ]
    },
    {
        path: 'yavadevs',
        children: [
            { path: '', component: MainPageComponent, data: { titulo: 'Pagina principal' } },
            { path: 'aboutUs', component: AboutUsComponent, data: { titulo: 'About us' } },
            { path: 'shopInfo', component: ShopPageComponent, data: { titulo: 'Shop' } },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


