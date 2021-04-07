import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdicionaisAddComponent } from './adicionaisManager/adicionais-add/adicionais-add.component';
import { AdicionaisComponent } from './adicionaisManager/adicionais/adicionais.component';
import { AddItemComponent } from './cardapioManager/add-item/add-item.component';
import { CardapioComponent } from './cardapioManager/cardapio/cardapio.component';
import { EditItemComponent } from './cardapioManager/edit-item/edit-item.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaxaEntregaComponent } from './EntregaManager/taxa-entrega/taxa-entrega.component';
import { ExpedienteComponent } from './expedienteManager/expediente/expediente.component';
import { PagamentosComponent } from './pagamentoManager/pagamentos/pagamentos.component';
import { CartLocalComponent } from './pedidosManager/cart-local/cart-local.component';
import { LocalShopComponent } from './pedidosManager/local-shop/local-shop.component';
import { PedidosManagerComponent } from './pedidosManager/pedidos-manager/pedidos-manager.component';
import { PendenteComponent } from './pedidosManager/pendente/pendente.component';
import { PerfilComponent } from './perfilManager/perfil/perfil.component';
import { PrintConfigComponent } from './print/print-config/print-config.component';
import { PromoComponent } from './promoçõesManager/promo/promo.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'cardapio', component: CardapioComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'entrega', component: TaxaEntregaComponent},
  {path: 'expediente', component: ExpedienteComponent},
  {path: 'promocoes', component: PromoComponent },
  {path:'pagamentos', component: PagamentosComponent},
  {path: 'add-item', component: AddItemComponent},
  {path: 'edit', component: EditItemComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path:'add-extras', component: AdicionaisComponent},
  {path:'extra-item', component: AdicionaisAddComponent},
  {path: 'meus-pedidos', component: PedidosManagerComponent},
  {path:'print-config', component: PrintConfigComponent},
  {path: 'shop-local', component: LocalShopComponent},
  {path:'cart-local', component: CartLocalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
