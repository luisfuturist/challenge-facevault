import { Route } from '@angular/router';
import { BreadcrumbItem } from './components/breadcrumb-items/breadcrumb-item';

export const routes: CustomRoutes = [
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
        loadComponent: () => import('./pages/person-list/person-list.component').then(m => m.PersonListComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/persons' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas' },
            ]
        }
    },
    {
        path: 'add-person',
        loadComponent: () => import('./pages/add-person/add-person.component').then(m => m.AddPersonComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas', path: '/persons' },
                { icon: 'plus', label: 'Criar', ariaLabel: 'Criar' },
            ]
        }
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.PageNotFoundComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/persons' },
                { icon: 'question', label: 'Página não encontrada', ariaLabel: 'Página não encontrada' },
            ]
        }
    }
];

interface CustomRoute extends Route {
    data?: {
        breadcrumb: BreadcrumbItem[]
    };
}

type CustomRoutes = CustomRoute[]
