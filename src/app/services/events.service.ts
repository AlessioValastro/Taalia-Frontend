import { inject, Injectable } from '@angular/core';
import { Event } from '../interfaces/event';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  eventsList?: [Event];
  http = inject(HttpClient);
  authService = inject(AuthService);

  getEventsList(userId: number) {
    return this.http.get(`api/get-events/${userId}`);
  }
}
