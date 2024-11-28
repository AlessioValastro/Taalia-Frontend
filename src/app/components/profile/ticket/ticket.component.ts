import { Component, Input, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  @Input() eventId!: number; //se lo passo come segnale mi scombina l'url
  title = input<string>();
  organizer = input<string>();
  description = input<string>();
  date = input<any>();
  imgSrc = input<string>();
}
