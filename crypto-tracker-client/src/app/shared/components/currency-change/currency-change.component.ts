import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-currency-change',
  templateUrl: './currency-change.component.html',
  styleUrls: ['./currency-change.component.scss']
})
export class CurrencyChangeComponent {

  @Input() startValue: number = 0;
  @Input() endValue: number = 0;
  @Input() percentage: boolean = false;

  /**
   * Returns true if the current value is not less than the total amount spent.
   */
  @HostBinding('class.is-positive')
  get isPositive(): boolean {
    return this.startValue <= this.endValue
  }

  /**
   * Gets the difference between the total balance and total amount spent.
   */
  get difference(): number {
    return this.endValue - this.startValue;
  }

  /**
   * Gets the difference between the total balance and total amount spent as a percentage.
   */
  get percentageDifference(): number {
    return Math.abs(this.difference / this.startValue);
  }
}
