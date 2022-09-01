import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { FiatCurrency } from '@models/fiat-currency.model';
import { Settings } from '@models/settings.model';
import { Token } from '@models/token.model';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { selectFiatRate } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectSettings } from 'src/app/state/selectors/settings.selectors';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent implements OnInit {

  @Output() valid = new EventEmitter<boolean>();

  @Output() valueChange = new EventEmitter<{
      tokenId: string;
      amount: number;
      paidUsd: number;
      dateAquired?: string;
    }>();

  @Output() submitted = new EventEmitter();

  @Input() defaults: {
    tokenId?: string;
    amount?: number;
    paidUsd?: number;
    dateAquired?: string;
  } = {};

  cryptoTokens: Token[] = [];
  filteredCryptoTokens$: ReplaySubject<Token[]> = new ReplaySubject<Token[]>(1);

  @ViewChild('tokenSelect', { static: true }) cryptoTokenSelect!: MatSelect;

  cryptoTokenCtrl: FormControl = new FormControl('', Validators.required);
  cryptoTokenFilterCtrl: UntypedFormControl = new UntypedFormControl();

  assetForm = new FormGroup({
    cryptoToken: this.cryptoTokenCtrl,
    cryptoAmount: new FormControl('', Validators.required),
    amountPaid: new FormControl('', Validators.required),
    dateAquired: new FormControl(''),
  });

  settings: Settings | undefined;
  currentFiatCurrency: FiatCurrency | undefined;

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

    // Populate the settings.
    this.store.select(selectSettings).subscribe(settings => {
      this.settings = settings;

      this.store.select(selectFiatRate(this.settings.fiatCurrency)).subscribe(fiatRate => this.currentFiatCurrency = fiatRate);
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

  /**
   * Emits an event when the form is submitted via pressing enter.
   */
  submitassetForm() {
    if (this.assetForm.valid) {
      this.submitted.emit();
    }
  }

  ngOnInit(): void {
    // Listen for token search field value changes and run the filter function.   
    this.cryptoTokenFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCryptoTokens());

    // As the values change, emit them so they can be used by whatever component this form is placed in.
    this.assetForm.valueChanges.subscribe(changes => {
      // Emit whether the form is valid.
      this.valid.emit(this.assetForm.valid);

      if (this.assetForm.valid) {
        this.valueChange.emit({
          tokenId: changes.cryptoToken,
          amount: parseFloat(changes.cryptoAmount!),
          paidUsd: parseFloat(changes.amountPaid!),
          dateAquired: changes.dateAquired ?? undefined,
        })  
      }
    });

    // Set the default values once the form is initialized.
    this.setDefaultFormValues();
  }

  /**
   * Sets default values in all the form controls if they were provided.
   */
  setDefaultFormValues(): void {
    if (this.defaults) {
      const defaultValues = {
        cryptoToken: this.defaults.tokenId,
        ...(this.defaults.amount && { cryptoAmount: `${this.defaults.amount}` }),
        ...(this.defaults.paidUsd && { amountPaid: `${this.defaults.paidUsd}` }),
        ...(this.defaults.dateAquired && { dateAquired: this.defaults.dateAquired })
      }
  
      this.assetForm.patchValue(defaultValues);  
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
