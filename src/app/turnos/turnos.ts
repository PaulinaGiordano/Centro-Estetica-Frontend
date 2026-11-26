import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-turnos',
  imports: [FormsModule, RouterLink],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css',
})
export class Turnos {
  tratamientos = signal<any[]>([]);
  profesionales = signal<any[]>([]);
  horas = signal<string[]>([]);
  mensaje = signal('');
  error = signal('');
  hoy = new Date().toLocaleDateString('en-CA');
  usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  constructor(private http: HttpClient) {
    this.http
      .get<any[]>('http://localhost:3000/tratamientos')
      .subscribe((datos) => this.tratamientos.set(datos));
  }

  cargarProfesionales(idTratamiento: number) {
    this.horas.set([]);

    if (!idTratamiento) {
      this.profesionales.set([]);
      return;
    }

    this.http
      .get<any[]>('http://localhost:3000/profesionales/tratamiento/' + idTratamiento)
      .subscribe((datos) => this.profesionales.set(datos));
  }

  cargarHoras(idProfesional: number, fecha: string) {
    if (!idProfesional || !fecha) {
      this.horas.set([]);
      return;
    }

    this.http
      .get<string[]>('http://localhost:3000/profesionales/' + idProfesional + '/horarios/' + fecha)
      .subscribe((datos) => this.horas.set(datos));
  }

  reservar(
    idTratamiento: number,
    idProfesional: number,
    fecha: string,
    hora: string,
    observaciones: string,
  ) {
    const datos = {
      idTratamiento: Number(idTratamiento),
      idProfesional: Number(idProfesional),
      fecha,
      hora,
      observaciones,
    };

    this.http.post('http://localhost:3000/turnos', datos).subscribe({
      next: () => {
        this.mensaje.set('Tu turno quedó reservado. Te esperamos.');
        this.error.set('');
      },
      error: (e) => {
        this.error.set(e.error?.mensaje || 'No se pudo reservar el turno. Revisá los datos.');
        this.mensaje.set('');
      },
    });
  }
}
