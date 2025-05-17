import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

interface DbResponse {
  actors: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private baseUrl = environment.actorEndpointPath;

  constructor(private http: HttpClient) {}

  // Obtener todos los actores
  getActors(): Observable<any[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => data.actors || [])
    );
  }

  // Obtener múltiples actores por sus IDs
  getActorsByIds(ids: string[]): Observable<any[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const actors = data.actors || [];
        return actors.filter(actor => ids.includes(actor.id));
      })
    );
  }
}
