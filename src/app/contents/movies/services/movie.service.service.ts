import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import { Movie } from '../model/movie.entity';

interface DbResponse {
  movies: Movie[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = `${environment.serverBaseUrl}${environment.movieEndpointPath}`;

  constructor(private http: HttpClient) {}


  getMovies(): Observable<Movie[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data: DbResponse) => {
        if (!data.movies || !Array.isArray(data.movies)) {
          console.error("No se encontraron películas");
          return [];
        }
        // Convierte los objetos en instancias de Movie
        return data.movies.map(movie => new Movie(movie));
      })
    );
  }


 getMovieById(id: string): Observable<Movie | {}> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data: DbResponse) => {
        const movies = data.movies || [];
        const foundMovie = movies.find(movie => movie.id === id);
        return foundMovie ? new Movie(foundMovie) : {};
      })
    );
  }
}
