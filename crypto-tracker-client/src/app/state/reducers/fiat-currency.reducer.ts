import { loadFiatCurrencies, loadFiatCurrenciesError, loadFiatCurrenciesSuccess } from "../actions/fiat-currency.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { FiatCurrenciesState } from "../app.state";

const initialState: FiatCurrenciesState = {
  isLoading: false,
  items: []
}

const reducer = createReducer(
  initialState,

  on(loadFiatCurrenciesSuccess, (_state, action) => ({ 
    isLoading: false, 
    items: action.fiatCurrencies.filter(item => item.type === 'fiat')
  })),
  on(loadFiatCurrenciesError, (state) => ({ ...state, isLoading: false })),
  on(loadFiatCurrencies, (state) => ({ ...state, isLoading: true }))
);

export function FiatCurrencyReducer(state: FiatCurrenciesState | undefined, action: Action) {
  return reducer(state, action);
}