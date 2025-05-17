import { Injectable } from '@angular/core';
import { User } from '../../../model/user.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = environment.userEndpointPath;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    const url = this.usersUrl;
    console.log("Login URL:", url);

    return this.http.get<{ users: User[] }>(url).pipe(
      map((data) => {
        const foundUser = data.users.find(user => user.userName === username && user.password === password);
        if (foundUser) {
          console.log("User authenticated:", foundUser);
          // Guarda el usuario en el localStorage
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          return foundUser;
        }
        console.warn("Login failed for username:", username);
        return null;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
