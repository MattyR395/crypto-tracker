import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Asset } from '@models/asset.model';
import { Token } from '@models/token.model';
import { AppState, TokensState } from 'src/app/state/app.state';
import { selectTokens } from 'src/app/state/selectors/token.selectors';
import { UserMessagingService } from 'src/app/shared/services/user-messaging/user-messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { deleteHolding } from 'src/app/state/actions/holding.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditAssetDialogComponent } from 'src/app/shared/components/edit-asset-dialog/edit-asset-dialog.component';
import { Holding } from '@models/holding.model';

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

  constructor(
    private store: Store<AppState>, 
    private userMessagingService: UserMessagingService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {
    this.store.select(selectTokens).subscribe((tokens: TokensState) => this.cryptoTokens = tokens.items);
  }

  /**
   * Opens a confirmation dialog to delete the holding.
   */
  openDeleteAssetConfirmDialog(): void {
    this.userMessagingService.openConfirmDialog({
      message: this.translateService.instant('AssetConfirmation.Description'),
      title: this.translateService.instant('AssetConfirmation.Title'),
      okButtonText: this.translateService.instant('AssetConfirmation.ConfirmButtonLabel'),
      cancelButtonText: this.translateService.instant('AssetConfirmation.CancelButtonLabel'),
      confirmButtonColor: 'warn'
    }).subscribe(deleteAccepted => {
      if (deleteAccepted) {
        this.store.dispatch(deleteHolding({ holdingId: this.asset.id }));
      }
    });
  }

  /**
   * Opens the edit asset dialog.
   */
  openEditAssetDialog(holding: Holding): void {
    this.dialog.open(EditAssetDialogComponent, {
      maxWidth: '30rem',
      width: '100%',
      data: holding
    })
  }
}
