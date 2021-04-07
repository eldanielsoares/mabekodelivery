import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePremiumComponent } from './home-premium/home-premium.component';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { ShopPremiumComponent } from './shop-premium/shop-premium.component';

const routes: Routes = [
  {path:'', component: ShopPremiumComponent,
  children: [
    {path:'pedidos', component: MeusPedidosComponent},
    {path:':url', component: HomePremiumComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopPremiumRoutingModule { }
