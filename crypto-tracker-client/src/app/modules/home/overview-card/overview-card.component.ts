import { Component, OnInit } from '@angular/core';
import { selectHoldings } from 'src/app/state/selectors/holding.selectors';
import { Holding } from 'src/app/shared/models/holding.model';
import { AppState, HoldingsState, TokensState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Token } from 'src/app/shared/models/token.model';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {

  /**
   * Returns true if the current value is not less than the total amount spent.
   */
  get isPositive(): boolean {
    return this.totalSpentUsd <= this.totalBalanceUsd
  }

  /**
   * Gets the difference between the total balance and total amount spent.
   */
  get difference(): number {
    return this.totalBalanceUsd - this.totalSpentUsd;
  }

  /**
   * Gets the difference between the total balance and total amount spent as a percentage.
   */
  get percentageDifference(): number {
    return Math.abs((this.totalBalanceUsd - this.totalSpentUsd) / this.totalSpentUsd);
  }

  /**
   * Gets the total amount spent in USD.
   */
  totalSpentUsd: number = 0;

  get totalBalanceUsd(): number {
    let totalBalance = 0;

    for (const holding of this.holdings) {
      const token = this.cryptoTokens.find(t => t.id === holding.tokenId);

      if (!token) continue;

      totalBalance += holding.amount * token.priceUsd;
    }

    return totalBalance;
  }

  holdings: Holding[] = [];
  cryptoTokens: Token[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectHoldings).subscribe((holdings: HoldingsState) => {
      this.holdings = holdings.items;
      this.totalSpentUsd = this.holdings.reduce((previous, current) => previous + current.paidUsd, 0);
    });

    this.store.select(selectTokens).subscribe((tokens: TokensState) => this.cryptoTokens = tokens.items);
  }
}
