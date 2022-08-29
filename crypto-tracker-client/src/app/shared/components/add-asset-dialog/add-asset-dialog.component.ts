import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Token } from '@models/token.model';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-add-asset-dialog',
  templateUrl: './add-asset-dialog.component.html',
  styleUrls: ['./add-asset-dialog.component.scss']
})
export class AddAssetDialogComponent implements OnInit, OnDestroy {

  cryptoTokens: Token[] = [];
  filteredCryptoTokens$: ReplaySubject<Token[]> = new ReplaySubject<Token[]>(1);

  @ViewChild('tokenSelect', { static: true }) cryptoTokenSelect!: MatSelect;

  cryptoTokenCtrl: FormControl = new FormControl('', Validators.required);
  cryptoTokenFilterCtrl: UntypedFormControl = new UntypedFormControl();

  addAssetForm = new FormGroup({
    cryptoToken: this.cryptoTokenCtrl,
    cryptoAmount: new FormControl('', Validators.required),
    amountPaid: new FormControl(''),
    dateAquired: new FormControl(''),
  })

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(selectTokens).subscribe(cryptoTokens => {
      // Prevent updating the filtered crypto tokens list if the list hasn't changed length. 
      // This is so we'll get the initial values but not keep refreshing the list as the user tries to search.
      if (cryptoTokens.items.length !== this.cryptoTokens.length) {
        this.cryptoTokens = cryptoTokens.items;

        // Populate the filtered tokens list initially.
        this.filteredCryptoTokens$.next(this.cryptoTokens.slice());
      }
    });
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

  /**
   * Filters the crypto tokens based on the search field value.
   * @returns 
   */
  filterCryptoTokens() {
    if (!this.cryptoTokens) {
      return;
    }

    // Get the search keyword
    let search = this.cryptoTokenFilterCtrl.value;

    if (!search) {
      this.filteredCryptoTokens$.next(this.cryptoTokens.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // Filter the currencies.
    this.filteredCryptoTokens$.next(
      this.cryptoTokens.filter(token => `${token.name} ${token.symbol}`.toLowerCase().indexOf(search ?? '') > -1)
    );
  }

  ngOnInit(): void {
    // Listen for token search field value changes and run the filter function.   
    this.cryptoTokenFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCryptoTokens());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
