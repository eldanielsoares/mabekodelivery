import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { BusinessRoutingModule } from './business-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardapioComponent } from './cardapioManager/cardapio/cardapio.component';
import { AddItemComponent } from './cardapioManager/add-item/add-item.component';
import { TaxaEntregaComponent } from './EntregaManager/taxa-entrega/taxa-entrega.component';
import { ExpedienteComponent } from './expedienteManager/expediente/expediente.component';
import { PromoComponent } from './promoçõesManager/promo/promo.component';
import { PagamentosComponent } from './pagamentoManager/pagamentos/pagamentos.component';
import { MaterialModule } from '../material.module';
import { PerfilComponent } from './perfilManager/perfil/perfil.component';
import { EditItemComponent } from './cardapioManager/edit-item/edit-item.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CategoriaComponent } from './categoria/categoria.component';
import { AdicionaisComponent } from './adicionaisManager/adicionais/adicionais.component';
import { AdicionaisAddComponent } from './adicionaisManager/adicionais-add/adicionais-add.component';
import { PedidosManagerComponent } from './pedidosManager/pedidos-manager/pedidos-manager.component';
import { PendenteComponent } from './pedidosManager/pendente/pendente.component';
import { AndamentoComponent } from './pedidosManager/andamento/andamento.component';
import { FinalizadoComponent } from './pedidosManager/finalizado/finalizado.component';
import { SaiuEntregaComponent } from './pedidosManager/saiu-entrega/saiu-entrega.component';
import { PrintConfigComponent } from './print/print-config/print-config.component';
import { LocalAtendimentoComponent } from './pedidosManager/local-atendimento/local-atendimento.component';
import { LocalShopComponent } from './pedidosManager/local-shop/local-shop.component';
import { CartLocalComponent } from './pedidosManager/cart-local/cart-local.component';
import { AdicionaisEditComponent } from './adiconaisManager/adicionais-edit/adicionais-edit.component';
import { EditAdicionaisComponent } from './adicionaisManager/edit-adicionais/edit-adicionais.component';
import { PrintComponent } from './pedidosManager/print/print.component';





@NgModule({
  declarations: [DashboardComponent, CardapioComponent, AddItemComponent, TaxaEntregaComponent, ExpedienteComponent, PromoComponent, PagamentosComponent, PerfilComponent, EditItemComponent, CategoriaComponent, AdicionaisComponent, AdicionaisAddComponent, PedidosManagerComponent, PendenteComponent, AndamentoComponent, FinalizadoComponent, SaiuEntregaComponent, PrintConfigComponent, LocalAtendimentoComponent, LocalShopComponent, CartLocalComponent, AdicionaisEditComponent, EditAdicionaisComponent, PrintComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    MatGoogleMapsAutocompleteModule
    
  ]
})
export class BusinessModule { }
