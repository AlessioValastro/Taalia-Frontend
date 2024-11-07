import { Component, inject, OnInit } from '@angular/core';
import { TicketComponent } from './ticket/ticket.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userType!: string;
  userID!: number;
  loggedIn: boolean = false;
  httpClient = inject(HttpClient);
  router = inject(Router);

  ngOnInit(): void {
    /*this.httpClient.get('/api/check-session').subscribe({
      next: (response) => {
        console.log(response);
        if (!response.logged_in) {
          this.router.navigate(['/login']);
        } else {
          this.userType = response.user_type;
          this.userID = response.user_id;
          localStorage.setItem('userID', this.userID.toString());
        }
      },
      error: (err) => {
        console.error('Errore verifica sessione:', err);
        this.router.navigate(['/login']);
      },
    });*/
  }
}
