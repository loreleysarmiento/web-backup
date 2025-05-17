import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor() {
    super();
    this.resourceEndpoint = environment.userEndpointPath;
  }

  registerUser(user: User): Observable<User> {
    return this.create(user);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${environment.serverBaseUrl}${environment.userEndpointPath}/${userId}`;
    console.log("User URL:", url);

    return this.http.get<User>(url).pipe(
      map((user: User) => {
        if (user) {
          console.log("User found:", user);
          return user;
        }
        console.warn("No user found for ID:", userId);
        return {} as User;  // Retorna un usuario vacío si no se encuentra
      })
    );
  }
}
