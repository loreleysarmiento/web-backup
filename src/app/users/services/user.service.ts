import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  private staticApiUrl = 'https://fake-api-raje.vercel.app/users';

  constructor() {
    super();
    this.resourceEndpoint = this.staticApiUrl;
  }

  registerUser(user: User): Observable<User> {
    return this.create(user);
  }

  getUserById(userId: string): Observable<User> {
    const url = this.staticApiUrl;

    console.log("User URL:", url);

    return this.http.get<{ users: User[] }>(url).pipe(
      map((data) => {
        const user = data.users.find(user => user.id.toString() === userId);
        if (user) {
          console.log("User found:", user);
          return user;
        }
        console.warn("No user found for ID:", userId);
        return {} as User;  
      })
    );
  }
}
