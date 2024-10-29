import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: 'accedi',
    component: LoginComponent,
  },
  { path: 'registrati', component: SignupComponent },
  {path: '', component: ProfileComponent}
];
