import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieDetailComponent} from '../../../../contents/movies/components/movie-detail/movie-detail.component';
import {BookDetailComponent} from '../../../../contents/books/components/book-detail/book-detail.component';
import {SerieDetailComponent} from '../../../../contents/series/components/serie-detail/serie-detail.component';
import {Movie} from '../../../../contents/movies/model/movie.entity';
import {Book} from '../../../../contents/books/model/book.entity';
import {Serie} from '../../../../contents/series/model/serie.entity';
import {MovieService} from '../../../../contents/movies/services/movie.service.service';
import {BookService} from '../../../../contents/books/services/book.service.service';
import {SerieService} from '../../../../contents/series/services/serie.service.service';
import {ReviewService} from '../../../../reviews/services/review.service';
import {ActorCardComponent} from '../../../../persons/actors/components/actor-card/actor-card.component';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [
    CommonModule,
    MovieDetailComponent,
    BookDetailComponent,
    SerieDetailComponent,
  ],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent implements OnInit {
  mixedContent: (Movie | Book | Serie)[] = [];

  constructor(
    private movieService: MovieService,
    private bookService: BookService,
    private serieService: SerieService,
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }
  mixContent(movies: Movie[], books: Book[], series: Serie[]): (Movie | Book | Serie)[] {
    const mixed: (Movie | Book | Serie)[] = [];

    for (let i = 0; i < 3; i++) {
      if (i < movies.length) mixed.push(new Movie(movies[i]));

    }
    for (let i = 0; i < 3; i++) {

      if (i < books.length) mixed.push(new Book(books[i]));

    }
    for (let i = 0; i < 3; i++) {

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
