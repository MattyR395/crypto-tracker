import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CryptoPriceService } from "src/app/shared/services/crypto-price/crypto-price.service";
import { loadHoldings, loadHoldingsError, loadHoldingsSuccess } from "../actions/holding.actions";
import { of } from "rxjs";

@Injectable()
export class HoldingEffects {
  
  loadHoldings$ = createEffect(() => this.actions$.pipe(
    ofType(loadHoldings),
    mergeMap(() => this.cryptoPriceService.getAllHoldings().pipe(
      map(holdings => loadHoldingsSuccess({ holdings })),
      catchError(() => of(loadHoldingsError()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private cryptoPriceService: CryptoPriceService
  ) { }
}