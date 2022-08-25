import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { loadSettings, loadSettingsError, loadSettingsSuccess, updateTheme, updateThemeError, updateThemeSuccess } from "../actions/settings.actions";
import { of } from "rxjs";
import { SettingsService } from "src/app/shared/services/settings/settings.service";

@Injectable()
export class SettingsEffects {
  
  loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(loadSettings),
    exhaustMap(() => this.settingsService.getSettings().pipe(
      switchMap((settings) => [
        loadSettingsSuccess({ settings }),
        updateThemeSuccess({ themeId: settings.themeId })
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

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) { }
}