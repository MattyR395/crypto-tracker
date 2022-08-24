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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-tracker-client';

  isSideNavOpen: boolean = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) { }

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
  }
}
