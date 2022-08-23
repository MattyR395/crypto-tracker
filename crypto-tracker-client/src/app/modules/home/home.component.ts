import { Component } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectAssets } from 'src/app/state/selectors/holding.selectors';
import { Asset } from 'src/app/shared/models/asset.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  assets: Asset[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select(selectAssets).subscribe(assets => this.assets = assets);
  }

  trackByFn(_index: number, item: Asset) {
    return item.id;
  }
}