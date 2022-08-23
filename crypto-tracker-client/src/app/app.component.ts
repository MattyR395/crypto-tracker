import { Component, OnInit } from '@angular/core';
import { loadFiatCurrencies } from './state/actions/fiat-currency.actions';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { loadHoldings } from './state/actions/holding.actions';
import { loadTokens } from './state/actions/token.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-tracker-client';

  isSideNavOpen: boolean = false;

  constructor(private store: Store<AppState>) { }

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

  ngOnInit(): void {
    this.store.dispatch(loadFiatCurrencies());
    this.store.dispatch(loadHoldings());
    this.store.dispatch(loadTokens());
  }
}
