import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CryptoPriceService } from "src/app/shared/services/crypto-price/crypto-price.service";
import { addHolding, addHoldingError, addHoldingSuccess, deleteHolding, deleteHoldingError, deleteHoldingSuccess, loadHoldings, loadHoldingsError, loadHoldingsSuccess } from "../actions/holding.actions";
import { of } from "rxjs";
import { HoldingService } from "src/app/shared/services/holding/holding.service";

@Injectable()
export class HoldingEffects {
  
  loadHoldings$ = createEffect(() => this.actions$.pipe(
    ofType(loadHoldings),
    mergeMap(() => this.cryptoPriceService.getAllHoldings().pipe(
      map(holdings => loadHoldingsSuccess({ holdings })),
      catchError(() => of(loadHoldingsError()))
    ))
  ));

  addHolding$ = createEffect(() => this.actions$.pipe(
    ofType(addHolding),
    mergeMap(({ holdingDto }) => this.holdingService.addHolding(holdingDto).pipe(
      map((holding) => addHoldingSuccess({ holding })),
      catchError(() => of(addHoldingError()))
    ))
  ));

  deleteHolding$ = createEffect(() => this.actions$.pipe(
    ofType(deleteHolding),
    mergeMap(({ holdingId }) => this.holdingService.deleteHolding(holdingId).pipe(
      map(() => deleteHoldingSuccess({ holdingId })),
      catchError(() => of(deleteHoldingError()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private cryptoPriceService: CryptoPriceService,
    private holdingService: HoldingService
  ) { }
}