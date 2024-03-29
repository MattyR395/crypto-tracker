import { Component, OnInit } from '@angular/core';
import { selectHoldings, selectTotalSpentUsd } from 'src/app/state/selectors/holding.selectors';
import { Holding } from '@models/holding.model';
import { AppState, HoldingsState, TokensState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Token } from '@models/token.model';
import { selectTokens } from 'src/app/state/selectors/token.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { Settings } from '@models/settings.model';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {
  
  /**
   * Gets the total amount spent in USD.
   */
  totalSpentUsd?: number;

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
  settings: Settings | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectHoldings).subscribe((holdings: HoldingsState) => this.holdings = holdings.items);

    this.store.select(selectTotalSpentUsd).subscribe(totalSpentUsd => this.totalSpentUsd = totalSpentUsd);

    this.store.select(selectTokens).subscribe((tokens: TokensState) => this.cryptoTokens = tokens.items);

    this.store.select(selectSettings).subscribe((settings: Settings) => this.settings = settings);
  }
}
