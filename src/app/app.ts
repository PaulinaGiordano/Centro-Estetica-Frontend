import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('centro-estetica-angular');

  constructor(private router: Router) {}

  get usuario() {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
