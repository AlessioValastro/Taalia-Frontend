import { Component, inject, OnInit } from '@angular/core';
import { TicketComponent } from './ticket/ticket.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { EventsCarouselComponent } from "../events-carousel/events-carousel.component";
import { NewEventComponent } from "../new-event/new-event.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketComponent, EventsCarouselComponent, NewEventComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userType!: string;
  userID!: number;
  userName!: string;
  loggedIn!: boolean;

  events?: [Event];
  authService = inject(AuthService);
  eventsService = inject(EventsService);
  router = inject(Router);

  ngOnInit(): void {
    this.checkAuth();
  }
  checkAuth(){
   this.authService.checkAuth().subscribe({
      next: (response: any) => {
        if (!response.logged_in) {
          this.router.navigate(['/login']);
        } else {
          this.userID = response.user_id;
          this.userName = response.name;
          this.loggedIn = true;
          this.userType = response.user_type;
          this.authService.updateLoginStatus(true);
          this.authService.updateUser(
            this.userName,
            this.userType,
            this.userID
          );

          this.loadEvents();
        }
      },
      error: (err) => {
        console.error('Errore verifica sessione:', err);
        this.router.navigate(['/login']);
      },
    }); 
  }
  

  loadEvents(): void {
    if (this.userID) {
      this.eventsService.getEventsList(this.userID, this.userType).subscribe({
        next: (response: any) => {
          this.events = response;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
