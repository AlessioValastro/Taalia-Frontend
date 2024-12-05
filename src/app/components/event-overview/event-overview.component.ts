import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.css',
})
export class EventOverviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventsService);
  data: any;

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap) => {
      const paramValue: string | null = paramMap.get('eventId');
      this.eventService.getEventInfo(paramValue).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = response;
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }


}
