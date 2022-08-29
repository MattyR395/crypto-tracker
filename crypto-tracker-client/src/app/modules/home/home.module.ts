import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyModule } from 'src/app/shared/components/currency/currency.module';
import { CurrencyChangeModule } from 'src/app/shared/components/currency-change/currency-change.module';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    OverviewCardComponent,
    HomeComponent,
    AssetCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    CurrencyModule,
    CurrencyChangeModule,
    TranslateModule,
    MatDialogModule
  ]
})
export class HomeModule { }
