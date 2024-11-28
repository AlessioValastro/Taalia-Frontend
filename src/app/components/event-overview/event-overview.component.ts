import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.css',
})
export class EventOverviewComponent implements OnInit {
  route = inject(ActivatedRoute);
  eventService = inject(EventsService);

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap) => {
      const paramValue: string | null = paramMap.get('eventId');
      this.eventService.getEventInfo(paramValue).subscribe({
        next: (respone: any) => {
          console.log(respone);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }
}
