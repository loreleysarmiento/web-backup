import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { map } from 'rxjs/operators';
import {Book} from '../model/book.entity';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.serverBaseUrl + environment.bookEndpointPath;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(books => books.map(book => new Book(book)))
    );
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<any[]>(`${this.baseUrl}?id=${id}`).pipe(
      map(books => new Book(books[0] || {}))
    );
  }
}
