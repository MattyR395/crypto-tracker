import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectFiatCurrencyItems } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { FiatCurrency } from '../../models/fiat-currency.model';
import { Settings } from '../../models/settings.model';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {

  fiatCurrencies$: Observable<FiatCurrency[]> = this.store.select(selectFiatCurrencyItems);
  settings$: Observable<Settings> = this.store.select(selectSettings);

  constructor(private store: Store<AppState>) { }

}
