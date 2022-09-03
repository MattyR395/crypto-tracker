import { AppState, TokensState } from "../app.state";
import { createSelector } from '@ngrx/store';

export const selectTokens = (state: AppState) => state.tokens;

export const selectAreTokensLoading = createSelector(
  selectTokens,
  (state: TokensState) => state.isLoading
);
