import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {Serie} from '../model/serie.entity';


@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private baseUrl = environment.serverBaseUrl + environment.serieEndpointPath;

  constructor(private http: HttpClient) {}

  // Obtener todas las series
  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl);
  }

  // Obtener una serie por su ID
  getSerieById(id: string): Observable<Serie> {
    return this.http.get<Serie>(`${this.baseUrl}/${id}`);
  }

  // Obtener múltiples series por sus IDs
  getSeriesByIds(ids: string[]): Observable<Serie[]> {
    const queryString = ids.map(id => `id=${id}`).join('&');
    const url = `${this.baseUrl}?${queryString}`;
    return this.http.get<Serie[]>(url);
  }
}
