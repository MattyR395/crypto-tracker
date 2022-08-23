import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holding } from 'src/app/shared/models/holding.model';
import { Token } from 'src/app/shared/models/token.model';
import { AppState } from 'src/app/state/app.state';
import { selectAssets, selectHoldings } from 'src/app/state/selectors/holding.selectors';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent{

  assets: IAsset[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select(selectAssets).subscribe(assets => this.assets = assets);
  }

  trackByFn(_index: number, item: IAsset) {
    return item.id;
  }
}

interface IAsset extends Holding {
  name: string;
  symbol: string;
  priceUsd: number; 
}
