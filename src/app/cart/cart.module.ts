import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionaisPipe } from './Pipes/adicionais.pipe';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';



@NgModule({
  declarations: [CartItemsComponent, AdicionaisPipe],
  imports: [
    CommonModule,
    CartRoutingModule,
    MaterialModule, 
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule
  ]
})
export class CartModule { }
