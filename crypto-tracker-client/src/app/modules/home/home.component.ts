import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectFiatCurrencies } from 'src/app/state/selectors/fiat-currency.selectors';
import { selectHoldings } from 'src/app/state/selectors/holding.selectors';
import { selectTokens } from 'src/app/state/selectors/token.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
  }
}