import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductoComponent } from './producto/producto.component';
import { CarritoDeLaCompraComponent } from './carrito-de-la-compra/carrito-de-la-compra.component';
import { EnvioComponent } from './envio/envio.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { NuevoProductoComponent } from './mantenimientos/productos/nuevo-producto/nuevo-producto.component';
import { AboutUsComponent } from './beforeauth/about-us/about-us.component';
import { MainPageComponent } from './beforeauth/main-page/main-page.component';
import { ConfirmarEnvioComponent } from './confirmar-envio/confirmar-envio.component';
import { SitemaPagosComponent } from './sitema-pagos/sitema-pagos.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { ShopPageComponent } from './beforeauth/shop-page/shop-page.component';
import { PedidosPorIdComponent } from './mantenimientos/pedidos-por-id/pedidos-por-id.component';
import { TodoPedidosComponent } from './mantenimientos/todo-pedidos/todo-pedidos.component';




@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PerfilComponent,
    UsuariosComponent,
    BusquedaComponent,
    PedidosComponent,
    ProductoComponent,
    CarritoDeLaCompraComponent,
    EnvioComponent,
    ProductosComponent,
    NuevoProductoComponent,
    AboutUsComponent,
    MainPageComponent,
    ConfirmarEnvioComponent,
    SitemaPagosComponent,
    TarjetaCreditoComponent,
    ShopPageComponent,
    PedidosPorIdComponent,
    TodoPedidosComponent,
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
