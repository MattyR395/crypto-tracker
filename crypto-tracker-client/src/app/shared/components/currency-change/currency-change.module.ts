import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyChangeComponent } from './currency-change.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyModule } from '../currency/currency.module';



@NgModule({
  declarations: [
    CurrencyChangeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CurrencyModule
  ],
  exports: [
  CurrencyChangeComponent    
  ]
})
export class CurrencyChangeModule { }
