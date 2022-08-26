import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CryptoPriceService } from "src/app/shared/services/crypto-price/crypto-price.service";
import { editToken, loadTokens, loadTokensError, loadTokensSuccess } from "../actions/token.actions";
import { of } from "rxjs";
import { loadHoldingsSuccess } from "../actions/holding.actions";
import { Holding } from "@models/holding.model";

@Injectable()
export class TokenEffects {
  
  loadTokens$ = createEffect(() => this.actions$.pipe(
    ofType(loadTokens),
    switchMap(() => this.cryptoPriceService.getTokens().pipe(
      map(tokens => loadTokensSuccess({ tokens })),
        catchError(() => of(loadTokensError()))
    ))
  ));

  updateTokenPrices$ = createEffect(() => this.actions$.pipe(
    ofType(loadHoldingsSuccess),
    switchMap(({ holdings }) => this.cryptoPriceService.connectPricesSocket(holdings).pipe(
      map(tokens => editToken({ tokens }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private cryptoPriceService: CryptoPriceService
  ) { }
}