import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { TicketComponent } from '../profile/ticket/ticket.component';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-events-carousel',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './events-carousel.component.html',
  styleUrl: './events-carousel.component.css',
})
export class EventsCarouselComponent implements OnInit {
  eventsService = inject(EventsService);
  events?: [Event];

  ngOnInit() {
    this.eventsService.getAllEventsList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.events = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
