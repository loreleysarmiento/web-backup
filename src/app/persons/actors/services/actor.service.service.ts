import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private baseUrl = environment.serverBaseUrl + environment.actorEndpointPath;

  constructor(private http: HttpClient) {}

  getActors(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getActorsByIds(ids: string[]): Observable<any[]> {
    const queryString = ids.map(id => `id=${id}`).join('&');
    const url = `${this.baseUrl}?${queryString}`;
    return this.http.get<any[]>(url);
  }

}
