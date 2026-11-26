import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
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
    this.http.post<any>('http://localhost:3000/auth/login', { email, contra }).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));

        if (respuesta.usuario.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/mis-turnos']);
        }
      },
      error: (e) => this.error.set(e.error?.mensaje || 'Email o contraseña incorrectos'),
    });
  }
}
