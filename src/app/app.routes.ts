import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'accedi',
    component: LoginComponent,
  },
  { path: 'registrati', component: SignupComponent },
  {path: '', component: HomeComponent}
];
