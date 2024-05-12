import { Component, OnInit, signal } from '@angular/core';
import { ActivationStart, Router, RouterLink } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BreadcrumbItem } from './breadcrumb-item';

@Component({
  selector: 'app-breadcrumb-items',
  standalone: true,
  imports: [RouterLink, NzBreadCrumbModule, NzIconModule],
  templateUrl: './breadcrumb-items.component.html',
  styleUrl: './breadcrumb-items.component.css'
})
export class BreadcrumbItemsComponent implements OnInit {
    data = signal<BreadcrumbItem[]>([])

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart) {
                let items = e.snapshot.data['breadcrumb'] as BreadcrumbItem[];

                if(!items) {
                    return;
                }

                this.data.set(items)
            }
        });
    }
}