import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';

const routes: Routes = [
  {path: '', component: CartItemsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
