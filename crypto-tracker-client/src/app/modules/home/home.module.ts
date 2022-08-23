import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyModule } from 'src/app/shared/components/currency/currency.module';
import { MyAssetsComponent } from './my-assets/my-assets.component';
import { CurrencyChangeModule } from 'src/app/shared/components/currency-change/currency-change.module';

@NgModule({
  declarations: [
    OverviewCardComponent,
    HomeComponent,
    MyAssetsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    CurrencyModule,
    CurrencyChangeModule
  ]
})
export class HomeModule { }
