import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  // Funzione per il login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('api/login', credentials, {
      withCredentials: true,
    });
  }

  // Funzione per la registrazione
  signup(data: any): Observable<any> {
    return this.http.post('api/signup', data, {
      withCredentials: true,
    });
  }

  // Funzione per il logout
  logout(): Observable<any> {
    return this.http.post('api/logout', {}, { withCredentials: true });
  }

  checkAuth() {
    return this.http.get('/api/check-session', { withCredentials: true });
  }
}
