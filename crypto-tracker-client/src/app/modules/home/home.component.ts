import { Component } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectAreHoldingsLoading, selectAssets } from 'src/app/state/selectors/holding.selectors';
import { Asset } from '@models/asset.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetDialogComponent } from 'src/app/shared/components/add-asset-dialog/add-asset-dialog.component';
import { selectAreFiatCurrenciesLoading } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectAreTokensLoading } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  assets: Asset[] = [];

  areAssetsLoading: boolean = true;
  areFiatCurrenciesLoading: boolean = true;
  areTokensLoading: boolean = true;

  /**
   * If anything is loading, the page is loading.
   */
  get isLoading(): boolean {
    return this.areAssetsLoading || this.areFiatCurrenciesLoading || this.areTokensLoading;
  }

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.store.select(selectAssets).subscribe(assets => this.assets = assets);

    // Get all the loading states.
    this.store.select(selectAreHoldingsLoading).subscribe(areHoldingsLoading => this.areAssetsLoading = areHoldingsLoading);
    this.store.select(selectAreFiatCurrenciesLoading)
      .subscribe(areFiatCurrenciesLoading => this.areFiatCurrenciesLoading = areFiatCurrenciesLoading);
    this.store.select(selectAreTokensLoading).subscribe(areTokensLoading => this.areTokensLoading = areTokensLoading);

  }

  trackByFn(_index: number, item: Asset) {
    return item.id;
  }

  openAddAssetDialog(): void {
    this.dialog.open(AddAssetDialogComponent, {
      maxWidth: '30rem',
      width: '100%'
    });
  }
}