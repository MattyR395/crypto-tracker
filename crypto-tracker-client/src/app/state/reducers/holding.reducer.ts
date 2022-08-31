import { addHoldingSuccess, deleteHoldingSuccess, loadHoldings, loadHoldingsError, loadHoldingsSuccess } from "../actions/holding.actions"
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

  on(addHoldingSuccess, (state, action) => ({ ...state, items: [...state.items, action.holding] })),

  on(deleteHoldingSuccess, (state, action) => ({ ...state, items: state.items.filter(holding => holding.id !== action.holdingId) }))
);

export function HoldingReducer(state: HoldingsState | undefined, action: Action) {
  return reducer(state, action);
}