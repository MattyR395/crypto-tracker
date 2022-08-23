import { createAction, props } from '@ngrx/store';
import { Holding } from 'src/app/shared/models/holding.model';

export const loadHoldings = createAction('[Holdings] Load Holdings');
export const loadHoldingsError = createAction('[Holdings] Load Holdings Error');
export const loadHoldingsSuccess = createAction(
  '[Holdings] Load Holdings Success', 
  props<{ holdings: Holding[] }>()
);