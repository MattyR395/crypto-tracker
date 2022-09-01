import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FiatCurrencyReducer } from './state/reducers/fiat-currency.reducer';
import { FiatCurrencyEffects } from './state/effects/fiat-currency.effects';
import { TokenReducer } from './state/reducers/token.reducer';
import { TokenEffects } from './state/effects/token.effects';
import { HoldingEffects } from './state/effects/holding.effects';
import { HoldingReducer } from './state/reducers/holding.reducer';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SettingsEffects } from './state/effects/settings.effects';
import { SettingsReducer } from './state/reducers/settings.reducer';
import { SettingsDialogModule } from './shared/components/settings-dialog/settings-dialog.module';
import { AddAssetDialogModule } from './shared/components/add-asset-dialog/add-asset-dialog.module';
import { ConfirmDialogModule } from './shared/components/confirm-dialog/confirm-dialog.module';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SettingsDialogModule,
    matModules,
    BrowserAnimationsModule,
    AddAssetDialogModule,
    HttpClientModule,
    ConfirmDialogModule,
    StoreModule.forRoot({
      fiatCurrencies: FiatCurrencyReducer,
      tokens: TokenReducer,
      holdings: HoldingReducer,
      settings: SettingsReducer
    }),
    EffectsModule.forRoot([
      FiatCurrencyEffects,
      TokenEffects,
      HoldingEffects,
      SettingsEffects
    ]),
    AuthModule.forRoot(environment.auth),
    TranslateModule.forRoot({ 
      loader: { 
        provide: TranslateLoader, 
        useFactory: HttpLoaderFactory, 
        deps: [HttpClient] 
      } 
    })
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

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}