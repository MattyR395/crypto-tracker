import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Settings } from '../../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    return this.http.get<any>(`${environment.apiUrl}/settings`);
  }
}
