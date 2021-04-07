import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { NotfoundComponent } from './shop/notfound/notfound.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  { path: 'm', loadChildren: () => import('./shop/shop.module').then(shop => shop.ShopModule) },
  { path: 'd', loadChildren: () => import('./shop-premium/shop-premium.module').then(shopPremium => shopPremium.ShopPremiumModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(cart => cart.CartModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPassComponent },
  { path: 'dashboard', loadChildren: () => import('./business/business.module').then(business => business.BusinessModule), ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'termos', loadChildren:()=> import('./termos/termos.module').then(termos => termos.TermosModule)},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
