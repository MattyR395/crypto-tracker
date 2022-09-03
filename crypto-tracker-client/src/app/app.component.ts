import { Component, Inject, OnInit } from '@angular/core';
import { loadFiatCurrencies } from './state/actions/fiat-currency.actions';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { loadHoldings } from './state/actions/holding.actions';
import { loadTokens } from './state/actions/token.actions';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { SettingsDialogComponent } from './shared/components/settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { loadSettings } from './state/actions/settings.actions';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './shared/services/settings/settings.service';
import { selectSettings } from './state/selectors/settings.selectors';
import { selectAreHoldingsLoading } from './state/selectors/holding.selectors';
import { selectAreFiatCurrenciesLoading } from './state/selectors/fiat-currency.selectors';
import { selectAreTokensLoading } from './state/selectors/token.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-tracker-client';

  isSideNavOpen: boolean = false;

  areTokensLoading: boolean = true;
  areAssetsLoading: boolean = true;
  areFiatCurrenciesLoading: boolean = true;

  get isLoading(): boolean {
    return this.areAssetsLoading || this.areFiatCurrenciesLoading || this.areTokensLoading;
  }

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    public auth: AuthService,
    translate: TranslateService,
    @Inject(DOCUMENT) public document: Document
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  /**
   * Toggles whether the sidenav is open or not.
   */
   toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  /**
   * Closes the sidenav. 
   * Used on the tinted page overlay to prevent double clicks from reopening the nav.
   */
  closeSideNav() {
    this.isSideNavOpen = false;
  }  

  /**
   * Opens the dialog to edit settings.
   */
   openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, {
      maxWidth: '50rem',
      width: '100%'
    });
  }  

  ngOnInit(): void {
    this.store.dispatch(loadFiatCurrencies());
    this.store.dispatch(loadHoldings());
    this.store.dispatch(loadTokens());
    this.store.dispatch(loadSettings());

    this.store.select(selectSettings).subscribe(settings => {
      this.settingsService.setTheme(settings.themeId);
      this.settingsService.setUiScale(settings.uiScaleId);
    })

    // Get all the loading states.
    this.store.select(selectAreHoldingsLoading).subscribe(areHoldingsLoading => this.areAssetsLoading = areHoldingsLoading);
    this.store.select(selectAreFiatCurrenciesLoading)
      .subscribe(areFiatCurrenciesLoading => this.areFiatCurrenciesLoading = areFiatCurrenciesLoading);
    this.store.select(selectAreTokensLoading).subscribe(areTokensLoading => this.areTokensLoading = areTokensLoading);
  }
}
