import { Component } from '@angular/core';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
