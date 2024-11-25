import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-new-event-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-event-form.component.html',
  styleUrl: './new-event-form.component.css',
})
export class NewEventFormComponent {
  formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'), // Pattern per un numero decimale
    ]),
  });

  http = inject(HttpClient);
  errMessage: string = '';
  router = inject(Router);
  authService = inject(AuthService);
  eventService = inject(EventsService);

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
    if (control?.hasError('pattern')) {
      return 'Inserisci un valore numerico valido';
    }
    return '';
  }

  onSubmit() {
    if (this.formData.valid) {
      const formValues = this.formData.value;
      // Effettua la chiamata HTTP per creare l'evento
      this.eventService.createNewEvent(formValues).subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      // Mostra messaggi di errore per i campi non validi
      this.errMessage = 'Compila correttamente tutti i campi obbligatori.';
    }
  }
}
