import { createAction, props } from '@ngrx/store';
import { TokenPrice } from '@models/token-price.model';
import { Token } from '@models/token.model';

export const loadTokens = createAction('[Tokens] Load Tokens');
export const loadTokensError = createAction('[Tokens] Load Tokens Error');
export const loadTokensSuccess = createAction(
  '[Tokens] Load Tokens Success', 
  props<{ tokens: Token[] }>()
);

export const editToken = createAction(
  '[Tokens] Edit Token', 
  props<{ tokens: TokenPrice[] }>()
);