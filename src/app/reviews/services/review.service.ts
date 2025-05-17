// src/app/reviews/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Review } from '../model/review.entity';
import { Movie } from '../../contents/movies/model/movie.entity';

interface DbResponse {
  reviews: Review[];
  movies: Movie[];
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = environment.reviewEndPointPath;
  private moviesUrl = environment.movieEndpointPath;

  constructor(private http: HttpClient) {}

  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.userId === userId) || [])
    );
  }

  getEnrichedReviews(userId: string): Observable<any[]> {
    return this.getReviewsByUserId(userId).pipe(
      switchMap(reviews => {
        const contentRequests = reviews.map(review => this.getMovieById(review.contenidoId));

        return forkJoin(contentRequests).pipe(
          map((movies) => {
            return reviews.map((review, index) => {
              const movie = movies[index];
              return {
                ...review,
                contenidoTitulo: movie.titulo,
                contenidoImagen: movie.imagen
              };
            });
          })
        );
      })
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<DbResponse>(this.moviesUrl).pipe(
      map((data) => data.movies.find(movie => movie.id === id) || {})
    );
  }

  getReviewsByMovieId(contenidoId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.contenidoId === contenidoId) || [])
    );
  }
}
