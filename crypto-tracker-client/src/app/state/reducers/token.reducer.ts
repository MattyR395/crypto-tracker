import { loadTokens, loadTokensError, loadTokensSuccess, editToken } from "../actions/token.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { TokensState } from "../app.state";
import { TokenPrice } from "src/app/shared/models/token-price.model";

const initialState: TokensState = {
  isLoading: false,
  items: []
}

const reducer = createReducer(
  initialState,

  on(loadTokensSuccess, (_state, action) => ({ isLoading: false, items: action.tokens })),
  on(loadTokensError, (state) => ({ ...state, isLoading: false })),
  on(loadTokens, (state) => ({ ...state, isLoading: true })),

  on(editToken, (state, action) => {

    const newItems = [...state.items];

    // Go through each of the tokens provided and update their prices if they match the id of the token being edited.
    action.tokens.forEach((tokenPrice: TokenPrice) => {
      const index = newItems.findIndex(token => token.id === tokenPrice.id);
      newItems[index] = { ...newItems[index], priceUsd: tokenPrice.priceUsd };
    });

    return { ...state, items: newItems };
  })
);

export function TokenReducer(state: TokensState | undefined, action: Action) {
  return reducer(state, action);
}