// src/app/public/components/Parati/parati.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from '../../../../contents/movies/components/movie-detail/movie-detail.component';
import { BookDetailComponent } from '../../../../contents/books/components/book-detail/book-detail.component';
import { SerieDetailComponent } from '../../../../contents/series/components/serie-detail/serie-detail.component';
import { OtherUserReviewCardComponent } from '../../../../reviews/components/other-user-review-card/other-user-review-card.component';
import { Movie } from '../../../../contents/movies/model/movie.entity';
import { Book } from '../../../../contents/books/model/book.entity';
import { Serie } from '../../../../contents/series/model/serie.entity';
import { MovieService } from '../../../../contents/movies/services/movie.service.service';
import { BookService } from '../../../../contents/books/services/book.service.service';
import { SerieService } from '../../../../contents/series/services/serie.service.service';
import { ReviewService } from '../../../../reviews/services/review.service';
import { Review } from '../../../../reviews/model/review.entity';

@Component({
  selector: 'app-parati',
  standalone: true,
  imports: [
    CommonModule,
    MovieDetailComponent,
    BookDetailComponent,
    SerieDetailComponent,
    OtherUserReviewCardComponent
  ],
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.css']
})
export class ParatiComponent implements OnInit {
  mixedContent: (Movie | Book | Serie)[] = [];
  reviewsByContent: { [key: string]: Review[] } = {};

  constructor(
    private movieService: MovieService,
    private bookService: BookService,
    private serieService: SerieService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }
  mixContent(movies: Movie[], books: Book[], series: Serie[]): (Movie | Book | Serie)[] {
    const mixed: (Movie | Book | Serie)[] = [];
    const maxLength = Math.max(movies.length, books.length, series.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < movies.length) mixed.push(new Movie(movies[i]));
      if (i < books.length) mixed.push(new Book(books[i]));
      if (i < series.length) mixed.push(new Serie(series[i]));
    }

    return mixed;
  }

  loadContent(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.bookService.getBooks().subscribe(
          (books) => {
            this.serieService.getSeries().subscribe(
              (series) => {
                this.mixedContent = this.mixContent(movies, books, series);
                this.loadReviews();
              },
              (error) => console.error("Error loading series:", error)
            );
          },
          (error) => console.error("Error loading books:", error)
        );
      },
      (error) => console.error("Error loading movies:", error)
    );
  }

  loadReviews(): void {
    this.mixedContent.forEach(item => {
      this.reviewService.getReviewsByMovieId(item.id).subscribe(
        (reviews) => {
          this.reviewsByContent[item.id] = reviews.slice(0, 3);  // Limitar a 3 reseñas
          console.log(`Reseñas para el contenido ${item.id}:`, this.reviewsByContent[item.id]);
        },
        (error) => console.error(`Error loading reviews for content ${item.id}:`, error)
      );
    });
  }


  getReviewsForContent(contentId: string): Review[] {
    return this.reviewsByContent[contentId] || [];
  }

  isMovie(item: any): item is Movie {
    return item instanceof Movie;
  }

  isBook(item: any): item is Book {
    return item instanceof Book;
  }

  isSerie(item: any): item is Serie {
    return item instanceof Serie;
  }
}
