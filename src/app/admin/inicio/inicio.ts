import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioAdmin {
  constructor(private router: Router) {}

  salir() {
    localStorage.removeItem('admin');
    this.router.navigate(['/admin/login']);
  }
}