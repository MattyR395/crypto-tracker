import { AppState, HoldingsState } from "../app.state";
import { createSelector } from '@ngrx/store';

export const selectHoldings= (state: AppState) => state.holdings;

export const areHoldingsLoading = createSelector(
  selectHoldings,
  (state: HoldingsState) => state.isLoading
);
