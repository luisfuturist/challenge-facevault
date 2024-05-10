import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <h1>Hello, {{ title }}</h1>
    <p>
      Congratulations! Your app is running.
    </p>

    <mat-icon>
      house
    </mat-icon>

    <div>
      <button mat-button color="primary" (click)="inc()">Count: {{count()}}</button>

      <button mat-button color="primary" (click)="printHello()">Print hello</button>
    </div>
  `,
    imports: [RouterOutlet, MaterialModule, HttpClientModule]
})
export class AppComponent {
    title = 'angular';
    count = signal(0)
    text = signal("")

    constructor(private http: HttpClient) {
        effect(() => {
            console.log(this.text())
        })
    }

    public inc() {
        this.count.update(c => c + 1)
    }

    public printHello() {
        type Message = {
            message: string
        }
        
        this.http.get<Message>("http://localhost:8080/").subscribe((res) => {
            this.text.set(res.message)
        })
    }
}
