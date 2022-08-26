import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateTheme } from 'src/app/state/actions/settings.actions';
import { AppState } from 'src/app/state/app.state';
import { selectFiatCurrencyItems } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { FiatCurrency } from '@models/fiat-currency.model';
import { Settings } from '@models/settings.model';
import { Theme } from '@models/theme.model';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {

  fiatCurrencies$: Observable<FiatCurrency[]> = this.store.select(selectFiatCurrencyItems);
  settings$: Observable<Settings> = this.store.select(selectSettings);

  themes: Theme[] = [];

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService
  ) { 
    this.themes = this.settingsService.getThemes();
  }

  /**
   * Sets the theme ID in the store which sets off a side effect to save
   * this preference and update the view.
   * @param change 
   */
  setTheme(change: MatSelectChange) {
    this.store.dispatch(updateTheme({ themeId: change.value }));
  }

}
