import { FiatCurrency } from "../shared/models/fiat-currency.model";
import { Holding } from "../shared/models/holding.model";
import { Settings } from "../shared/models/settings.model";
import { Token } from "../shared/models/token.model";

export interface FiatCurrenciesState {
  items: FiatCurrency[];
  isLoading: boolean;
}

export interface TokensState {
  items: Token[];
  isLoading: boolean;
}

export interface HoldingsState {
  items: Holding[];
  isLoading: boolean;
}

export interface SettingsState {
  settings: Settings;
  isLoading: boolean;
}

export interface AppState {
  fiatCurrencies: FiatCurrenciesState;
  tokens: TokensState;
  holdings: HoldingsState;
  settings: SettingsState;
}