import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CryptoPriceService } from "src/app/shared/services/crypto-price/crypto-price.service";
import { loadFiatCurrencies, loadFiatCurrenciesError, loadFiatCurrenciesSuccess } from "../actions/fiat-currency.actions";
import { of } from "rxjs";

@Injectable()
export class FiatCurrencyEffects {
  
  loadFiatCurrencies$ = createEffect(() => this.actions$.pipe(
    ofType(loadFiatCurrencies),
    switchMap(() => this.cryptoPriceService.getFiatRates().pipe(
      map(fiatCurrencies => (loadFiatCurrenciesSuccess({ fiatCurrencies }))),
        catchError(() => of(loadFiatCurrenciesError()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private cryptoPriceService: CryptoPriceService
  ) { }
}