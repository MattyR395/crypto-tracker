import { Component, OnInit } from '@angular/core';
import { Token } from '@models/token.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-add-asset-dialog',
  templateUrl: './add-asset-dialog.component.html',
  styleUrls: ['./add-asset-dialog.component.scss']
})
export class AddAssetDialogComponent {

  cryptoTokens: Token[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(selectTokens).subscribe(cryptoTokens => this.cryptoTokens = cryptoTokens.items);
  }

  /**
   * Prevents the tokens dropdown list jumping around as their values update.
   * @param _index not used.
   * @param token Token
   * @returns An ID that can be used by Angular to track which UI elements need updating.
   */
  tokenTrackByFn(_index: number, token: Token): string {
    return token.id;
  }
}
