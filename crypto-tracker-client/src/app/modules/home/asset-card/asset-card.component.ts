import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Asset } from '@models/asset.model';
import { Holding } from '@models/holding.model';
import { Token } from '@models/token.model';
import { AppState, TokensState } from 'src/app/state/app.state';
import { selectAssets } from 'src/app/state/selectors/holding.selectors';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss']
})
export class AssetCardComponent {

  @Input() asset!: Asset;

  cryptoTokens: Token[] = [];

  fiatValue: number = 0;

  get holdingValueUsd(): number {
    return this.asset.amount * this.asset.priceUsd;
  }

  constructor(private store: Store<AppState>) {
    this.store.select(selectTokens).subscribe((tokens: TokensState) => this.cryptoTokens = tokens.items);
  }
}
