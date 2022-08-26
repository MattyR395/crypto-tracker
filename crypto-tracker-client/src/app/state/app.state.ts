import { FiatCurrency } from "@models/fiat-currency.model";
import { Holding } from "@models/holding.model";
import { Settings } from "@models/settings.model";
import { Token } from "@models/token.model";

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