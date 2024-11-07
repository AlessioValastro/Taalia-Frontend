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
  httpClient = inject(HttpClient);
  errMessage: string = '';
  router= inject(Router);

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

  onSubmit() {
    if (this.formData.valid) {
      const data = this.formData.value;
      this.httpClient
        .post('api/login', data, { responseType: 'json' })
        .subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (err) => {
            this.errMessage = err.error.message;
          },
        });
    }
  }
}
