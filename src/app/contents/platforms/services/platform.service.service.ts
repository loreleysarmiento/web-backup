import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Platform } from '../model/platform.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private baseUrl = environment.serverBaseUrl + environment.platformEndpointPath;

  constructor(private http: HttpClient) {}

  getPlatformsByIds(ids: string[]): Observable<Platform[]> {
    return this.http.get<{ platforms: Platform[] }>(this.baseUrl).pipe(
      map((data) => {
        const platforms = data.platforms || [];
        return platforms.filter(platform => ids.includes(platform.id));
      })
    );
  }
}
