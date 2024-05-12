import { Routes } from '@angular/router';
import { PersonListComponent } from './pages/person-list/person-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/persons' },
  { path: 'persons', component: PersonListComponent }
];
