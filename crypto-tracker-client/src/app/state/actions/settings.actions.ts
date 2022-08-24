import { createAction, props } from '@ngrx/store';
import { Settings } from 'src/app/shared/models/settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsError = createAction('[Settings] Load Settings Error');
export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success', 
  props<{ settings: Settings }>()
);