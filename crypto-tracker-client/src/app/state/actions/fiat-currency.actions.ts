import { createAction, props } from '@ngrx/store';
import { FiatCurrency } from '@models/fiat-currency.model';

export const loadFiatCurrencies = createAction('[Fiat Currency] Load Fiat Currencies');
export const loadFiatCurrenciesError = createAction('[Fiat Currency] Load Fiat Currencies Error');
export const loadFiatCurrenciesSuccess = createAction(
  '[Fiat Currency] Load Fiat Currencies Success', 
  props<{ fiatCurrencies: FiatCurrency[] }>()
);