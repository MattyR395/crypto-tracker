import { createAction, props } from '@ngrx/store';
import { ThemeEnum } from 'src/app/shared/enums/theme.enum';
import { Settings } from 'src/app/shared/models/settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsError = createAction('[Settings] Load Settings Error');
export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success', 
  props<{ settings: Settings }>()
);

export const updateTheme = createAction('[Settings] Update Theme', props<{ themeId: ThemeEnum }>());
export const updateThemeError = createAction('[Settings] Update Theme Error');
export const updateThemeSuccess = createAction('[Settings] Update Theme Success', props<{ themeId: ThemeEnum }>());