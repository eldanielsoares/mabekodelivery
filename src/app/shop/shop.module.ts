import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionalPipePipe } from './Pipes/adicional-pipe.pipe';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [HomeComponent, NotfoundComponent, AdicionalPipePipe],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class ShopModule { }
