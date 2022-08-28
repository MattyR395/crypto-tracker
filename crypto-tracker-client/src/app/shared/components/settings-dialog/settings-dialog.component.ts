import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { updateTheme, updateUiScale } from 'src/app/state/actions/settings.actions';
import { AppState } from 'src/app/state/app.state';
import { selectFiatCurrencyItems } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { FiatCurrency } from '@models/fiat-currency.model';
import { Settings } from '@models/settings.model';
import { Theme } from '@models/theme.model';
import { UiScale } from '@models/ui-scale.model';
import { SettingsService } from '../../services/settings/settings.service';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit, OnDestroy {

  @ViewChild('currencySelect', { static: true }) currencySelect!: MatSelect;

  fiatCurrencies: FiatCurrency[] = [];

  settings: Settings | undefined;
  themes: Theme[] = [];
  uiScales: UiScale[] = [];

  currencyCtrl: UntypedFormControl = new UntypedFormControl();
  currencyFilterCtrl: UntypedFormControl = new UntypedFormControl();
  filteredFiatCurrencies: ReplaySubject<FiatCurrency[]> = new ReplaySubject<FiatCurrency[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService
  ) {
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

  /**
   * Filters the fiat currencies based on the search field value.
   * @returns 
   */
  filterFiatCurrencies() {
    if (!this.fiatCurrencies) {
      return;
    }
 
    // Get the search keyword
    let search = this.currencyFilterCtrl.value;

    if (!search) {
      this.filteredFiatCurrencies.next(this.fiatCurrencies.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // Filter the currencies.
    this.filteredFiatCurrencies.next(
      this.fiatCurrencies.filter(currency => currency.symbol.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit(): void {
    // Populate the settings.
    this.store.select(selectSettings).subscribe(settings => {
      this.settings = settings;

      // Set initial currency selection.
      this.currencyCtrl.setValue(this.settings.fiatCurrency);
    });

    this.store.select(selectFiatCurrencyItems).subscribe(fiatCurrencies => {
      // Populate fiatCurrencies and sort it by symbol.
      this.fiatCurrencies = [...fiatCurrencies].sort((a, b) => a.symbol.localeCompare(b.symbol));

      // load the initial bank list
      this.filteredFiatCurrencies.next(this.fiatCurrencies.slice());
    });

    // Listen for currency search field value changes and run the filter function.
    this.currencyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterFiatCurrencies());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
