import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { Platform } from '../model/platform.entity';
import { map } from 'rxjs/operators';

interface DbResponse {
  platforms: Platform[];
}

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private baseUrl = environment.platformEndpointPath;

  constructor(private http: HttpClient) {}

  getPlatformsByIds(ids: string[]): Observable<Platform[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const platforms = data.platforms || [];
        return platforms.filter(platform => ids.includes(platform.id));
      })
    );
  }

  getAllPlatforms(): Observable<Platform[]> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => data.platforms || [])
    );
  }

  getPlatformById(id: string): Observable<Platform | {}> {
    return this.http.get<DbResponse>(this.baseUrl).pipe(
      map((data) => {
        const platform = data.platforms.find(platform => platform.id === id);
        return platform ? platform : {};
      })
    );
  }
}
