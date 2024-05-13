import { Route } from '@angular/router';
import { BreadcrumbItem } from './components/breadcrumb-items/breadcrumb-item';

export const routes: CustomRoutes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/person/list',
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home' }
            ],
        }
    },
    {
        path: 'person/list',
        loadComponent: () => import('./pages/person/list/person-list.component').then(m => m.PersonListComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas' },
            ]
        }
    },
    {
        path: 'person/add',
        loadComponent: () => import('./pages/person/add/person-add.component').then(m => m.PersonAddComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas', path: '/person/list' },
                { icon: 'plus', label: 'Criar', ariaLabel: 'Criar' },
            ]
        }
    },
    {
        path: 'person/details/:id',
        loadComponent: () => import('./pages/person/details/person-details.component').then(m => m.PersonDetailsComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas', path: '/person/list' },
                { icon: 'info-circle', label: 'Pessoa', ariaLabel: 'Pessoa' },
            ]
        }
    },
    {
        path: 'person/edit/:id',
        loadComponent: () => import('./pages/person/edit/person-edit.component').then(m => m.PersonEditComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/' },
                { icon: 'user', label: 'Pessoas', ariaLabel: 'Pessoas', path: '/person/list' },
                { icon: 'edit', label: 'Pessoa', ariaLabel: 'Pessoa' },
            ]
        }
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.PageNotFoundComponent),
        data: {
            breadcrumb: [
                { icon: 'home', ariaLabel: 'Home', path: '/' },
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
