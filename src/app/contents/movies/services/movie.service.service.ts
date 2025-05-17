import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.serverBaseUrl + environment.movieEndpointPath;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?id=${id}`).pipe(
      map(movies => movies[0] || {})  
    );
  }
}
