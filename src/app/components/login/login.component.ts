import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  http = inject(HttpClient);
  errMessage: string = '';
  router = inject(Router);
  authService = inject(AuthService);

  getErrorMessage(fieldName: string): string {
    const control = this.formData.get(fieldName);
    if (control?.hasError('required')) {
      return 'Questo campo è obbligatorio';
    }
    if (control?.hasError('minlength')) {
      return `Lunghezza minima: ${control.errors?.['minlength'].requiredLength} caratteri`;
    }
    if (control?.hasError('email')) {
      return 'Formato email non valido';
    }
    return '';
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: (response: any) => {
        if (response.logged_in) {
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        console.error('Errore verifica sessione:', err);
        this.router.navigate(['/login']);
      },
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      const data = this.formData.value;
      const email: string = data.email!;
      const password: string = data.password!;

      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.authService.updateLoginStatus(true);
          this.router.navigate(['profile']);
        },
        error: (error) => {
          console.error('Errore di login:', error);
        },
      });
    }
  }
}
