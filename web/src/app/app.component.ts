import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './icons-provider.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconsProviderModule, NzLayoutModule, NzBreadCrumbModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Facevault';
}

