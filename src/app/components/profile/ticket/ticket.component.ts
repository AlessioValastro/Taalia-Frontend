import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  title = input<string>();
  organizer = input<string>();
  description = input<string>();
  date = input<any>();
  imgSrc = input<string>();
}
