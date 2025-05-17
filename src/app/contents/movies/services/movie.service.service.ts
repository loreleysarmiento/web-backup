import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = `${environment.serverBaseUrl}${environment.movieEndpointPath}`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => {
        // Verifica que "movies" exista en la respuesta
        if (!data.movies || !Array.isArray(data.movies)) {
          console.error("No se encontraron películas");
          return [];
        }
        return data.movies;
      })
    );
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => {
        // Busca la película por ID
        const movies = data.movies || [];
        return movies.find(movie => movie.id.toString() === id) || {};
      })
    );
  }
}
