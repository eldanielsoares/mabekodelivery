import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPremiumRoutingModule } from './shop-premium-routing.module';
import { ShopPremiumComponent } from './shop-premium/shop-premium.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { HomePremiumComponent } from './home-premium/home-premium.component';


@NgModule({
  declarations: [ShopPremiumComponent, MeusPedidosComponent, HomePremiumComponent],
  imports: [
    CommonModule,
    ShopPremiumRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShopPremiumModule { }
