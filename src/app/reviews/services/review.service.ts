// src/app/reviews/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Review } from '../model/review.entity';
import{MovieService} from '../../contents/movies/services/movie.service.service';

interface DbResponse {
  reviews: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = environment.reviewEndPointPath;

  constructor(private http: HttpClient, private movieService: MovieService) {}

  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.userId === userId) || [])
    );
  }

  getEnrichedReviews(userId: string): Observable<any[]> {
    return this.getReviewsByUserId(userId).pipe(
      switchMap(reviews => {
        const contentRequests = reviews.map(review =>
          this.movieService.getMovieById(review.contenidoId)  // Usando MovieService
        );

        return forkJoin(contentRequests).pipe(
          map((movies) => {
            return reviews.map((review, index) => {
              const movie = movies[index];
              return {
                ...review,
                contenidoTitulo: movie instanceof Object ? movie.titulo : 'Desconocido',
                contenidoImagen: movie instanceof Object ? movie.imagen : ''
              };
            });
          })
        );
      })
    );
  }

  getReviewsByMovieId(contenidoId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.contenidoId === contenidoId) || [])
    );
  }
}
