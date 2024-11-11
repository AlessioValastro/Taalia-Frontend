import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  authService = inject(AuthService);
  errMessage: string = '';
  router: any;
  
  formData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    status: new FormControl('', [Validators.required]),
  });

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
      this.authService.signup(data).subscribe({
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
