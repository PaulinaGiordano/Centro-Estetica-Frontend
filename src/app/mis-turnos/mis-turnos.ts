import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-turnos',
  imports: [DatePipe, RouterLink],
  templateUrl: './mis-turnos.html',
  styleUrl: './mis-turnos.css',
})
export class MisTurnos {
  turnos = signal<any[]>([]);
  error = signal('');

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    this.http
      .get<any[]>('http://localhost:3000/turnos/mios')
      .subscribe((datos) => this.turnos.set(datos));
  }

  cancelar(id: number) {
    this.http.put('http://localhost:3000/turnos/mios/' + id + '/cancelar', {}).subscribe({
      next: () => {
        this.error.set('');
        this.cargar();
      },
      error: (e) => this.error.set(e.error?.mensaje || 'No se pudo cancelar el turno'),
    });
  }
}
