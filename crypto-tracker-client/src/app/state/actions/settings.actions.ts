import { createAction, props } from '@ngrx/store';
import { ThemeEnum } from '@enums/theme.enum';
import { Settings } from '@models/settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsError = createAction('[Settings] Load Settings Error');
export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success', 
  props<{ settings: Settings }>()
);

export const updateTheme = createAction('[Settings] Update Theme', props<{ themeId: ThemeEnum }>());
export const updateThemeError = createAction('[Settings] Update Theme Error');
export const updateThemeSuccess = createAction('[Settings] Update Theme Success', props<{ themeId: ThemeEnum }>());

export const updateUiScale = createAction('[Settings] Update UI Scale', props<{ uiScaleId: number }>());
export const updateUiScaleError = createAction('[Settings] Update UI Scale Error');
export const updateUiScaleSuccess = createAction('[Settings] Update UI Scale Success', props<{ uiScaleId: number }>());

export const updateFiatCurrency = createAction('[Settings] Update Fiat Currency', props<{ currencySymbol: string }>());
export const updateFiatCurrencyError = createAction('[Settings] Update Fiat Currency Error');
export const updateFiatCurrencySuccess = createAction('[Settings] Update Fiat Currency Success', props<{ currencySymbol: string }>());

