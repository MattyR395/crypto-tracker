import { loadSettings, loadSettingsError, loadSettingsSuccess, updateFiatCurrencySuccess, updateThemeSuccess, updateUiScaleSuccess } from "../actions/settings.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState } from "../app.state";
import { ThemeEnum } from "@enums/theme.enum";

const initialState: SettingsState = {
  isLoading: false,
  settings: {
    fiatCurrency: '',
    themeId: ThemeEnum.DARK,
    language: 'en',
    uiScaleId: 3
  }
}

const reducer = createReducer(
  initialState,

  on(loadSettingsSuccess, (_state, action) => ({ isLoading: false, settings: action.settings })),
  on(loadSettingsError, (state) => ({ ...state, isLoading: false })),
  on(loadSettings, (state) => ({ ...state, isLoading: true })),

  on(updateThemeSuccess, (state, action) => ({ ...state, settings: { ...state.settings, themeId: action.themeId } })),

  on(updateUiScaleSuccess, (state, action) => ({ ...state, settings: { ...state.settings, uiScaleId: action.uiScaleId } })),

  on(updateFiatCurrencySuccess, (state, action) => ({ ...state, settings: { ...state.settings, fiatCurrency: action.currencySymbol } }))
);

export function SettingsReducer(state: SettingsState | undefined, action: Action) {
  return reducer(state, action);
}