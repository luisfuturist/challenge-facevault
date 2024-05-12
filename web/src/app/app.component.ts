import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BreadcrumbItemsComponent } from './components/breadcrumb-items/breadcrumb-items.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, IconsProviderModule, NzLayoutModule, BreadcrumbItemsComponent, NzBreadCrumbModule, NzMenuModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

}
