import { createAction, props } from '@ngrx/store';
import { Holding } from '@models/holding.model';
import { CreateHoldingDto } from '@api/holdings/dto/create-holding.dto';

export const loadHoldings = createAction('[Holdings] Load Holdings');
export const loadHoldingsError = createAction('[Holdings] Load Holdings Error');
export const loadHoldingsSuccess = createAction(
  '[Holdings] Load Holdings Success', 
  props<{ holdings: Holding[] }>()
);

export const addHolding = createAction('[Holdings] Add Holding', props<{ holdingDto: CreateHoldingDto }>());
export const addHoldingError = createAction('[Holdings] Add Holding Error');
export const addHoldingSuccess = createAction('[Holdings] Add Holding Success', props<{ holding: Holding }>());