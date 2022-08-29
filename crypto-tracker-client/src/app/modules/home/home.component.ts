import { Component } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectAssets } from 'src/app/state/selectors/holding.selectors';
import { Asset } from '@models/asset.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetDialogComponent } from 'src/app/shared/components/add-asset-dialog/add-asset-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  assets: Asset[] = [];

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.store.select(selectAssets).subscribe(assets => this.assets = assets);
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