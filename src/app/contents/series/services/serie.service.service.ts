import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Serie } from '../model/serie.entity';
import { map } from 'rxjs/operators';

interface DbResponse {
  series: Serie[];
}

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private baseUrl = environment.serieEndpointPath;

  constructor(private http: HttpClient) {}

  // Obtener todas las series
  getAllSeries(): Observable<Serie[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => data.series || [])
    );
  }

  // Obtener una serie por su ID
  getSerieById(id: string): Observable<Serie | {}> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const serie = data.series.find(serie => serie.id === id);
        return serie ? serie : {};
      })
    );
  }

  // Obtener múltiples series por sus IDs
  getSeriesByIds(ids: string[]): Observable<Serie[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const series = data.series || [];
        return series.filter(serie => ids.includes(serie.id));
      })
    );
  }
}
