import { AppState, FiatCurrenciesState } from "../app.state";
import { createSelector } from '@ngrx/store';
import { getCurrencySymbol } from '@angular/common';

export const selectFiatCurrencies = (state: AppState) => state.fiatCurrencies;

export const selectFiatRate = (symbol: string) => createSelector(
  selectFiatCurrencies,
  (state: FiatCurrenciesState) => state.items.find(c => c.symbol === symbol)
)

export const areFiatCurrenciesLoading = createSelector(
  selectFiatCurrencies,
  (state: FiatCurrenciesState) => state.isLoading
);
