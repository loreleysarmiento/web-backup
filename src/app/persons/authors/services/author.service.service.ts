import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Author } from '../model/author.entity';

interface DbResponse {
  authors: Author[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = environment.authorEndpointPath;

  constructor(private http: HttpClient) {}

  getAuthorById(id: string): Observable<Author | {}> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const author = data.authors.find(author => author.id === id);
        return author ? new Author(author) : {};
      })
    );
  }
}
