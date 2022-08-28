import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { 
  loadSettings, 
  loadSettingsError, 
  loadSettingsSuccess, 
  updateFiatCurrency, 
  updateFiatCurrencyError, 
  updateFiatCurrencySuccess, 
  updateTheme, 
  updateThemeError, 
  updateThemeSuccess, 
  updateUiScale, 
  updateUiScaleError, 
  updateUiScaleSuccess 
} from "../actions/settings.actions";
import { of } from "rxjs";
import { SettingsService } from "src/app/shared/services/settings/settings.service";

@Injectable()
export class SettingsEffects {

  loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(loadSettings),
    exhaustMap(() => this.settingsService.getSettings().pipe(
      switchMap((settings) => [
        loadSettingsSuccess({ settings })
      ]),
      catchError(() => of(loadSettingsError()))
    ))
  ));

  /**
   * Update theme preference in the database.
   */
  updateThemeSetting$ = createEffect(() => this.actions$.pipe(
    ofType(updateTheme),
    switchMap(({ themeId }) => this.settingsService.updateTheme(themeId).pipe(
      map(() => updateThemeSuccess({ themeId })),
      catchError(() => of(updateThemeError()))
    ))
  ));

  /**
   * When the theme is successfully updated in the database, update the theme in the settings state.
   */
  setTheme$ = createEffect(() => this.actions$.pipe(
    ofType(updateThemeSuccess),
    tap(({ themeId }) => this.settingsService.setTheme(themeId))
  ), {
    dispatch: false
  });

  updateUiScaleSetting$ = createEffect(() => this.actions$.pipe(
    ofType(updateUiScale),
    switchMap(({ uiScaleId }) => this.settingsService.updateUiScale(uiScaleId).pipe(
      map(() => updateUiScaleSuccess({ uiScaleId })),
      catchError(() => of(updateUiScaleError()))
    ))
  ));

  setUiScale$ = createEffect(() => this.actions$.pipe(
    ofType(updateUiScaleSuccess),
    tap(({ uiScaleId }) => this.settingsService.setUiScale(uiScaleId))
  ), {
    dispatch: false
  });

  updateFiatCurrencySetting$ = createEffect(() => this.actions$.pipe(
    ofType(updateFiatCurrency),
    switchMap(({ currencySymbol }) => this.settingsService.updateFiatCurrency(currencySymbol).pipe(
      map(() => updateFiatCurrencySuccess({ currencySymbol })),
      catchError(() => of(updateFiatCurrencyError()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) { }
}