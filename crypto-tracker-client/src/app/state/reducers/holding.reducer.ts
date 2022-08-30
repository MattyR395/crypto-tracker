import { addHoldingSuccess, loadHoldings, loadHoldingsError, loadHoldingsSuccess } from "../actions/holding.actions"
import { Action, createReducer, on } from '@ngrx/store';
import { HoldingsState } from "../app.state";

const initialState: HoldingsState = {
  isLoading: false,
  items: []
}

const reducer = createReducer(
  initialState,

  on(loadHoldingsSuccess, (_state, action) => ({ isLoading: false, items: action.holdings })),
  on(loadHoldingsError, (state) => ({ ...state, isLoading: false })),
  on(loadHoldings, (state) => ({ ...state, isLoading: true })),

  on(addHoldingSuccess, (state, action) => ({ ...state, items: [...state.items, action.holding] }))
);

export function HoldingReducer(state: HoldingsState | undefined, action: Action) {
  return reducer(state, action);
}