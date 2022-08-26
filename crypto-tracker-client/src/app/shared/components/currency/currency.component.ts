import { Component, DEFAULT_CURRENCY_CODE, Inject, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectFiatRate } from 'src/app/state/selectors/fiat-currency.selectors';
import { FiatCurrency } from '@models/fiat-currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  @Input('value') 
  set valueUsd(value: number) {
    this._valueUsd = value;

    // Update the new value if the provided value changes.
    this.updateValue(value); 
  }

  private _valueUsd!: number;

  newValue: number = 0;
  fiatRate?: FiatCurrency;

  constructor(
    @Inject(DEFAULT_CURRENCY_CODE) private defaultCurrencyCode: string,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // Get the current fiat rate and update the newValue using this.
    this.store.select(selectFiatRate(this.defaultCurrencyCode)).subscribe(rate => {
      if (rate) {
        this.fiatRate = rate;
        this.updateValue(this._valueUsd)
      }
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
