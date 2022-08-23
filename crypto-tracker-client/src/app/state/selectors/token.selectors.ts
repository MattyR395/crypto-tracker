import { AppState, TokensState } from "../app.state";
import { createSelector } from '@ngrx/store';

export const selectTokens = (state: AppState) => state.tokens;

export const areTokensLoading = createSelector(
  selectTokens,
  (state: TokensState) => state.isLoading
);
