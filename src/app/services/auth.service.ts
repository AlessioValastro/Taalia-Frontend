import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  loggedIn = signal<boolean>(false);
  userName = signal<string>('');
  userType = signal<string>('');
  userId = signal<number>(0);

  updateLoginStatus(status: boolean) {
    this.loggedIn.set(status);
  }
  updateUser(userName: string, userType: string, userId: number) {
    this.userName.set(userName);
    this.userType.set(userType);
    this.userId.set(userId);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('api/login', credentials, {
      withCredentials: true,
    });
  }

  signup(data: any): Observable<any> {
    return this.http.post('api/signup', data, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post('api/logout', {}, { withCredentials: true });
  }

  checkAuth() {
    return this.http.get('/api/check-session', { withCredentials: true });
  }
}
