import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermosRoutingModule } from './termos-routing.module';
import { TermosComponent } from './termos/termos.component';


@NgModule({
  declarations: [TermosComponent],
  imports: [
    CommonModule,
    TermosRoutingModule
  ]
})
export class TermosModule { }
