import { AppState, FiatCurrenciesState } from "../app.state";
import { createSelector } from '@ngrx/store';

export const selectFiatCurrencies = (state: AppState) => state.fiatCurrencies;

export const selectFiatCurrencyItems = createSelector(
  selectFiatCurrencies,
  (state: FiatCurrenciesState) => state.items
);

export const selectFiatRate = (symbol: string) => createSelector(
  selectFiatCurrencies,
  (state: FiatCurrenciesState) => state.items.find(c => c.symbol === symbol)
);

export const areFiatCurrenciesLoading = createSelector(
  selectFiatCurrencies,
  (state: FiatCurrenciesState) => state.isLoading
);
