// tendencias.service.ts
import { Injectable } from '@angular/core';
import {Movie} from '../../../contents/movies/model/movie.entity';
import {Serie} from '../../../contents/series/model/serie.entity';
import {Book} from '../../../contents/books/model/book.entity';


@Injectable({
  providedIn: 'root'
})
export class TendenciasService {

  constructor() { }

  getTopMovies(): Movie[] {
    return [
      new Movie({ id: '1', titulo: 'Movie 1', imagen: 'movie1.jpg', sinopsis: 'Sinopsis movie 1' }),
      new Movie({ id: '2', titulo: 'Movie 2', imagen: 'movie2.jpg', sinopsis: 'Sinopsis movie 2' }),
      new Movie({ id: '3', titulo: 'Movie 3', imagen: 'movie3.jpg', sinopsis: 'Sinopsis movie 3' }),
    ];
  }

  getTopSeries(): Serie[] {
    return [
      new Serie({ id: '1', titulo: 'Serie 1', imagen: 'serie1.jpg', sinopsis: 'Sinopsis serie 1' }),
      new Serie({ id: '2', titulo: 'Serie 2', imagen: 'serie2.jpg', sinopsis: 'Sinopsis serie 2' }),
      new Serie({ id: '3', titulo: 'Serie 3', imagen: 'https://ih1.redbubble.net/image.600947688.0040/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg', sinopsis: 'Sinopsis serie 3' }),
    ];
  }

  getTopBooks(): Book[] {
    return [
      new Book({ id: '1', titulo: 'Book 1', imagen: 'book1.jpg', sinopsis: 'Sinopsis book 1' }),
      new Book({ id: '2', titulo: 'Book 2', imagen: 'book2.jpg', sinopsis: 'Sinopsis book 2' }),
      new Book({ id: '3', titulo: 'Book 3', imagen: 'book3.jpg', sinopsis: 'Sinopsis book 3' }),
    ];
  }
}
