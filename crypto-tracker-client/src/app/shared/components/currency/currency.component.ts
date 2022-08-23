import { Component, DEFAULT_CURRENCY_CODE, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectFiatRate } from 'src/app/state/selectors/fiat-currency.selectors';
import { FiatCurrency } from '../../models/fiat-currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnChanges {

  @Input() value!: number;

  newValue: number = 0;

  fiatRate?: FiatCurrency;

  constructor(
    @Inject(DEFAULT_CURRENCY_CODE) private defaultCurrencyCode: string,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectFiatRate(this.defaultCurrencyCode)).subscribe(rate => {
      if (rate) {
        this.fiatRate = rate;
        this.updateValue()
      }
    });
  }

  // When the input value changes, calculate the currency value.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.updateValue();
    }
  }

  /**
   * Updates the currency value with the current fiat rate.
   */
  updateValue(): void {
    if (this.fiatRate) {
      this.newValue = this.value / this.fiatRate.rateUsd;
    }
  }
}
