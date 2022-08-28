import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateTheme, updateUiScale } from 'src/app/state/actions/settings.actions';
import { AppState } from 'src/app/state/app.state';
import { selectFiatCurrencyItems } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { FiatCurrency } from '@models/fiat-currency.model';
import { Settings } from '@models/settings.model';
import { Theme } from '@models/theme.model';
import { UiScale } from '@models/ui-scale.model';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {

  fiatCurrencies$: Observable<FiatCurrency[]> = this.store.select(selectFiatCurrencyItems);

  settings: Settings | undefined;
  themes: Theme[] = [];
  uiScales: UiScale[] = [];

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService
  ) { 

    // Populate the settings.
    this.store.select(selectSettings).subscribe(settings => this.settings = settings);

    // Get the available themes and UI scales.
    this.themes = this.settingsService.getThemes();
    this.uiScales = this.settingsService.getUiScales();
  }

  /**
   * Sets the theme ID in the store which sets off a side effect to save
   * this preference and update the view.
   * @param change 
   */
  setTheme(change: MatSelectChange) {
    this.store.dispatch(updateTheme({ themeId: change.value }));
  }

  /**
   * Sets the UI scale ID in the store which sets off a side effect to save
   * this preference and update the view.
   * @param change 
   */
  setUiScale(change: MatSelectChange) {
    this.store.dispatch(updateUiScale({ uiScaleId: change.value }));
  }
}
