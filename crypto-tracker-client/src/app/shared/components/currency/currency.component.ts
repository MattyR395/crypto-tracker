import { Component, DEFAULT_CURRENCY_CODE, Inject, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectFiatRate } from 'src/app/state/selectors/fiat-currency.selectors';
import { FiatCurrency } from '@models/fiat-currency.model';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  @Input('value') 
  set valueUsd(value: number) {
    this._valueUsd = value;

    // Update the new value if the provided value changes.
    this.updateValue(value); 
  }

  private _valueUsd!: number;

  newValue: number = 0;
  fiatRate?: FiatCurrency;
  currencyCode: string = this.defaultCurrencyCode;

  constructor(
    @Inject(DEFAULT_CURRENCY_CODE) private defaultCurrencyCode: string,
    private store: Store<AppState>
  ) {
    // Populate the fiat currency code from settings if it is set.
    this.store.select(selectSettings).subscribe(settings => {
      this.currencyCode = settings.fiatCurrency ?? this.defaultCurrencyCode;

      // Get the current fiat rate and update the newValue using this.
      this.store.select(selectFiatRate(this.currencyCode)).subscribe(rate => {
        if (rate) {
          this.fiatRate = rate;
          this.updateValue(this._valueUsd)
        }
      });
    });
  }

  /**
   * Updates the currency value with the current fiat rate.
   */
  updateValue(valueUsd: number): void {
    if (this.fiatRate) {
      this.newValue = valueUsd / this.fiatRate.rateUsd;
    }
  }
}
