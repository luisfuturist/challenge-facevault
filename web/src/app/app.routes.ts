import { Routes } from '@angular/router';
import { AddPersonComponent } from './pages/add-person/add-person.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ThemeType } from '@ant-design/icons-angular';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/persons',
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home' }
            ],
        }
    },
    {
        path: 'persons',
        component: PersonListComponent,
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/persons' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas' },
            ]
        }
    },
    {
        path: 'add-person',
        component: AddPersonComponent,
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas', path: '/persons' },
                { icon: 'plus', label: 'Criar', ariaLabel: 'Criar' },
            ]
        }
    },
];

export interface BreadcrumbItem {
    label?: string;
    ariaLabel: string;
    icon?: string;
    iconTheme?: ThemeType;
    path?: string;
}
