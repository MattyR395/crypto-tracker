import { AppState, HoldingsState, TokensState } from "../app.state";
import { createSelector } from '@ngrx/store';
import { selectTokens } from "./token.selectors";
import { Holding } from "@models/holding.model";

export const selectHoldings = (state: AppState) => state.holdings;

export const areHoldingsLoading = createSelector(
  selectHoldings,
  (state: HoldingsState) => state.isLoading
);

export const selectAssets = createSelector(
  selectHoldings,
  selectTokens,
  (holdings: HoldingsState, tokens: TokensState) => {
    return holdings.items.map((holding: Holding) => {

      // Find the matching token to get extra details such as token name and priceUsd.
      const token = tokens.items.find(t => t.id === holding.tokenId);

      return {
        ...holding,
        name: token?.name || '',
        symbol: token?.symbol || '',
        priceUsd: token?.priceUsd || 0
      }
    });
  }
);

export const selectTotalSpentUsd = createSelector(
  selectHoldings,
  (state: HoldingsState) => state.items.reduce((previous, current) => previous + current.paidUsd, 0)
)