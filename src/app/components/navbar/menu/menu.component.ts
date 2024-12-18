import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loggedIn?: boolean;
  userType: string = this.authService.userType();
  userName: string = this.authService.userName();

  constructor() {
    effect(() => {
      const isLoggedIn = this.authService.loggedIn();
      const userName = this.authService.userName();
      this.userName = userName;
      this.loggedIn = isLoggedIn;
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('logout eseguito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
