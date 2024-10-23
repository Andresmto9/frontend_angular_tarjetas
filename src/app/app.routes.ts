import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';

export const routes: Routes = [
  { path: 'tarjeta', component: TarjetasComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
