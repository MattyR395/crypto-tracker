import { loadSettings, loadSettingsError, loadSettingsSuccess } from "../actions/settings.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState } from "../app.state";

const initialState: SettingsState = {
  isLoading: false,
  settings: {
    fiatCurrencySymbol: 'USD',
  }
}

const reducer = createReducer(
  initialState,

  on(loadSettingsSuccess, (_state, action) => ({ isLoading: false, settings: action.settings })),
  on(loadSettingsError, (state) => ({ ...state, isLoading: false })),
  on(loadSettings, (state) => ({ ...state, isLoading: true })),
);

export function SettingsReducer(state: SettingsState | undefined, action: Action) {
  return reducer(state, action);
}