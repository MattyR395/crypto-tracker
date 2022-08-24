import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadSettings, loadSettingsError, loadSettingsSuccess } from "../actions/settings.actions";
import { of } from "rxjs";
import { SettingsService } from "src/app/shared/services/settings/settings.service";

@Injectable()
export class SettingsEffects {
  
  loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(loadSettings),
    switchMap(() => this.settingsService.getSettings().pipe(
      map(settings => (loadSettingsSuccess({ settings }))),
        catchError(() => of(loadSettingsError()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) { }
}