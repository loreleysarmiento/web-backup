// src/app/reviews/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
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

  private hardcodedMovies: Movie[] = [
    {
      id: 'MV001',
      titulo: 'Harry Potter and the Philosopher\'s Stone',
      imagen: 'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      director_id: '',
      actores_id: [],
      genero: [],
      duracion: 152,
      fecha_lanzamiento: '2001-11-16',
      idioma_original: 'Inglés',
      pais_origen: 'Reino Unido',
      plataformas_id: [],
      sinopsis: ''
    },
    {
      id: 'MV002',
      titulo: 'The Godfather',
      imagen: 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      director_id: '',
      actores_id: [],
      genero: [],
      duracion: 175,
      fecha_lanzamiento: '1972-03-24',
      idioma_original: 'Inglés',
      pais_origen: 'Estados Unidos',
      plataformas_id: [],
      sinopsis: ''
    }
  ];

  constructor(private http: HttpClient) {}

  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.userId === userId) || [])
    );
  }

  getEnrichedReviews(userId: string): Observable<any[]> {
    return this.getReviewsByUserId(userId).pipe(
      switchMap(reviews => {
        const enrichedReviews = reviews.map((review) => {
          const movie = this.hardcodedMovies.find(m => m.id === review.contenidoId) || {};
          return {
            ...review,
            contenidoTitulo: movie.titulo || 'Desconocido',
            contenidoImagen: movie.imagen || ''
          };
        });
        return of(enrichedReviews);
      })
    );
  }

  getReviewsByMovieId(contenidoId: string): Observable<Review[]> {
    return this.http.get<DbResponse>(this.reviewsUrl).pipe(
      map((data) => data.reviews.filter(review => review.contenidoId === contenidoId) || [])
    );
  }
}
