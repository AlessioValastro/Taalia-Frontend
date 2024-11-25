import { inject, Injectable } from '@angular/core';
import { Event } from '../interfaces/event';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  eventsList?: [Event];
  http = inject(HttpClient);
  authService = inject(AuthService);

  getEventsList(userId: number, userType: string) {
    return this.http.get(`api/get-events/${userId}/${userType}`);
  }

  getAllEventsList() {
    return this.http.get('api/get-all-events');
  }

  createNewEvent(data: any) {
    return this.http.post('api/new-event', data, { withCredentials: true });
  }
}
