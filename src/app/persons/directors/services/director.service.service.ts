import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

interface DbResponse {
  directors: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private baseUrl = environment.directorEndpointPath;

  constructor(private http: HttpClient) {}

  // Obtener todos los directores
  getDirectors(): Observable<any[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => data.directors || [])
    );
  }

  // Obtener un director por su ID
  getDirectorById(id: string): Observable<any> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const director = data.directors.find(director => director.id === id);
        return director ? director : {};
      })
    );
  }
}
