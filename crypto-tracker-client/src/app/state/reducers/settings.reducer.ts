import { loadSettings, loadSettingsError, loadSettingsSuccess, updateTheme } from "../actions/settings.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState } from "../app.state";
import { ThemeEnum } from "src/app/shared/enums/theme.enum";

const initialState: SettingsState = {
  isLoading: false,
  settings: {
    fiatCurrencySymbol: '',
    themeId: ThemeEnum.DARK,
  }
}

const reducer = createReducer(
  initialState,

  on(loadSettingsSuccess, (_state, action) => ({ isLoading: false, settings: action.settings })),
  on(loadSettingsError, (state) => ({ ...state, isLoading: false })),
  on(loadSettings, (state) => ({ ...state, isLoading: true })),

  on(updateTheme, (state, action) => ({ ...state, settings: { ...state.settings, themeId: action.themeId } })),
);

export function SettingsReducer(state: SettingsState | undefined, action: Action) {
  return reducer(state, action);
}