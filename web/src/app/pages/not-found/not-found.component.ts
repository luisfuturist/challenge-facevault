import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [
        NzResultModule,
        NzButtonModule,
        RouterLink
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class PageNotFoundComponent {

}
