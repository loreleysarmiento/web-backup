import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Book } from '../model/book.entity';

interface DbResponse {
  books: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = environment.bookEndpointPath;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<DbResponse>(this.booksUrl).pipe(
      map((data: DbResponse) => {
        if (!data.books || !Array.isArray(data.books)) {
          console.error("No se encontraron libros");
          return [];
        }
        // Convierte los objetos en instancias de Book
        return data.books.map(book => new Book(book));
      })
    );
  }

  getBookById(id: string): Observable<Book | {}> {
    return this.http.get<DbResponse>(this.booksUrl).pipe(
      map((data: DbResponse) => {
        const books = data.books || [];
        const foundBook = books.find(book => book.id === id);
        return foundBook ? new Book(foundBook) : {};
      })
    );
  }
}
