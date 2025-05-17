import { Routes } from '@angular/router';
import { LoginComponent } from './users/pages/login-form/components/login/login.component';
import { UserProfileComponent } from './users/components/user-profile/user-profile.component';
import { RegisterComponent } from './users/pages/register/register/register.component';
import { TendenciasComponent } from './public/components/Tendencias/tendencias/tendencias.component';
import { ParatiComponent } from './public/components/Parati/parati/parati.component';
import { FavoritosComponent } from './public/components/Favoritos/favoritos/favoritos.component';
import {MovieDetailComponent} from './contents/movies/components/movie-detail/movie-detail.component';
import {ActorProfileComponent} from './persons/actors/components/actor-profile/actor-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tendencies', component: TendenciasComponent },
  { path: 'foryou', component: ParatiComponent },
  { path: 'favorites', component: TendenciasComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'actor/:id', component: ActorProfileComponent },
  { path: '**', redirectTo: 'login' }
];
