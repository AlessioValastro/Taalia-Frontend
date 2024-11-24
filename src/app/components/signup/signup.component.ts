import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SwitchComponent } from '../../utils/switch/switch.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SwitchComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{
  authService = inject(AuthService);
  errMessage: string = '';
  router: any;

  isOrganizer: boolean = false;

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

  onSwitchChange(newState: boolean): void {
    this.isOrganizer = newState;
  }

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

  formDataOrganizer = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9 ]+$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9, ]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  getErrorMessage(fieldName: string): string {
    const control = this.isOrganizer
      ? this.formDataOrganizer.get(fieldName)
      : this.formData.get(fieldName);
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
    if (this.isOrganizer) {
      if (this.formDataOrganizer.valid) {
        const data = this.formDataOrganizer.value;
        this.authService.signupOrganizer(data).subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (err) => {
            this.errMessage = err.error.message;
          },
        });
      }
    } else {
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
}
