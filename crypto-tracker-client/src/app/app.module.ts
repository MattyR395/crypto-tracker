import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FiatCurrencyReducer } from './state/reducers/fiat-currency.reducer';
import { FiatCurrencyEffects } from './state/effects/fiat-currency.effects';
import { TokenReducer } from './state/reducers/token.reducer';
import { TokenEffects } from './state/effects/token.effects';
import { HoldingEffects } from './state/effects/holding.effects';
import { HoldingReducer } from './state/reducers/holding.reducer';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    matModules,
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
    ]),
    AuthModule.forRoot(environment.auth),
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'GBP'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
