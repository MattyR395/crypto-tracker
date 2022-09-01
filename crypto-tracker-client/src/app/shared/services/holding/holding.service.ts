import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holding } from '@models/holding.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateHoldingDto } from '@api/holdings/dto/create-holding.dto';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  constructor(private http: HttpClient) { }

  /**
   * Sends a request to insert a new holding into the database.
   * @param holding Holding
   * @returns Observable the newly created holding.
   */
  addHolding(holding: CreateHoldingDto): Observable<Holding> {
    return this.http.post<Holding>(`${environment.apiUrl}/holdings`, holding);
  }

  /**
   * Sends a request to delete the holding with the given id.
   * @param holdingId ID of the holding to delete.
   * @returns Observable of the server response.
   */
  deleteHolding(holdingId: number): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/holdings/${holdingId}`);
  }

  /**
   * Sends a request to edit the given holding with the provided data.
   * @param holding A Holding containing the new data and the ID of the holding to edit.
   * @returns Observable of the server response.
   */
  editHolding(holding: Holding): Observable<Holding> {
    return this.http.patch<Holding>(`${environment.apiUrl}/holdings/${holding.id}`, holding);
  }
}
