import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  error = signal('');
  mensaje = signal('');

  constructor(private http: HttpClient) {}

  registrar(
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    contra: string,
    contra2: string,
  ) {
    this.error.set('');
    this.mensaje.set('');

    if (contra !== contra2) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    const datos = { nombre, apellido, email, telefono, contra };

    this.http.post<any>('http://localhost:3000/auth/registro', datos).subscribe({
      next: (respuesta) => this.mensaje.set(respuesta.mensaje),
      error: (e) => this.error.set(e.error?.mensaje || 'No se pudo crear la cuenta'),
    });
  }
}
