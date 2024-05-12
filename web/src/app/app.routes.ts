import { Route, Routes } from '@angular/router';
import { AddPersonComponent } from './pages/add-person/add-person.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
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
    {
        path: '**',
        component: PageNotFoundComponent,
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
