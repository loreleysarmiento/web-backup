import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {Platform} from '../model/platform.entity';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private platformsUrl = environment.platformEndpointPath;

  constructor(private http: HttpClient) {}

  getPlatformsByIds(ids: string[]): Observable<any[]> {
    return this.http.get<{ platforms: any[] }>(this.platformsUrl).pipe(
      map((data) => {
        const platforms = data.platforms || [];
        return platforms.filter(platform => ids.includes(platform.id));
      })
    );
  }
}
