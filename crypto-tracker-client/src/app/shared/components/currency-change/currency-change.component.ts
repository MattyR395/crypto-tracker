import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-currency-change',
  templateUrl: './currency-change.component.html',
  styleUrls: ['./currency-change.component.scss']
})
export class CurrencyChangeComponent {

  @Input() from: number = 0;
  @Input() to: number = 0;
  @Input() percentage: boolean = false;

  /**
   * Returns true if the current value is not less than the total amount spent.
   */
  @HostBinding('class.is-positive')
  get isPositive(): boolean {
    return this.from <= this.to
  }

  /**
   * Gets the difference between the total balance and total amount spent.
   */
  get difference(): number {
    return this.to - this.from;
  }

  /**
   * Gets the difference between the total balance and total amount spent as a percentage.
   */
  get percentageDifference(): number {
    return Math.abs(this.difference / this.from);
  }
}
