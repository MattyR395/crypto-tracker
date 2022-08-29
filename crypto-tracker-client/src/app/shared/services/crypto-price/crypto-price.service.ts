import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { TokenPrice } from '@models/token-price.model';
import { Holding } from '@models/holding.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoPriceService {

  pricesSocket$!: WebSocketSubject<any>;

  constructor(private http: HttpClient) { }

  /**
   * Creates a query string containing one of all the assets in our holdings.
   * @param holdings 
   * @returns 
   */
  private createAssetIdQueryString(holdings: Holding[]): string {
    // Filter out duplicate assets.
    holdings = holdings.filter((obj, pos, arr) => {
      return arr.map((mapObj: Holding) => mapObj.tokenId).indexOf(obj.tokenId) === pos
    });

    return holdings.map(holding => holding.tokenId).join(',');
  }

  connectPricesSocket(holdings: Holding[]): Observable<TokenPrice[]> {
    if (!this.pricesSocket$ || this.pricesSocket$.closed) {
      this.pricesSocket$ = webSocket(`wss://ws.coincap.io/prices?assets=${this.createAssetIdQueryString(holdings)}`);
      return this.pricesSocket$.pipe(
        map((response: Object) => {
          return Object.entries(response).map(([key, value]) => {
            return ({ id: key, priceUsd: value });
          })
        })
      );
    } else {
      throw Error('Socket is already open');
    }
  }

  getTokens(): Observable<any> {
    return this.http.get<any>('https://api.coincap.io/v2/assets').pipe(
      map((response: any) => {
        return response.data
      })
    );
  }

  getFiatRates(): Observable<any> {
    return this.http.get<any>('https://api.coincap.io/v2/rates').pipe(
      map((response: any) => {
        return response.data
      })
    );
  }

  getAllHoldings(): Observable<Holding[]> {
    return this.http.get<any>(`${environment.apiUrl}/holdings`).pipe(
      map((response: Holding[]) => {
        return response.map(r => ({ 
          ...r, 
          amount: parseFloat(`${r.amount}`),
          paidUsd: parseFloat(`${r.paidUsd}`),
        }))
      })
    );
  }
}

