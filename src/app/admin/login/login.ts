import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  error = signal('');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  entrar(email: string, contra: string) {
    this.http
      .post<any>('http://localhost:3000/admin/login', {
        email: email,
        contra: contra,
      })
      .subscribe({
        next: (respuesta) => {
          localStorage.setItem('token', respuesta.token);
          this.router.navigate(['/admin']);
        },
        error: () => this.error.set('Email o contraseña incorrectos'),
      });
  }
}
