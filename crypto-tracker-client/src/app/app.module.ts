import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FiatCurrencyReducer } from './state/reducers/fiat-currency.reducer';
import { FiatCurrencyEffects } from './state/effects/fiat-currency.effects';
import { TokenReducer } from './state/reducers/token.reducer';
import { TokenEffects } from './state/effects/token.effects';
import { HoldingEffects } from './state/effects/holding.effects';
import { HoldingReducer } from './state/reducers/holding.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      fiatCurrencies: FiatCurrencyReducer,
      tokens: TokenReducer,
      holdings: HoldingReducer
    }),
    EffectsModule.forRoot([
      FiatCurrencyEffects,
      TokenEffects,
      HoldingEffects
    ])
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'GBP'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
