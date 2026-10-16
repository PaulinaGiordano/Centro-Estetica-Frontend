import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  imports: [FormsModule],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css'
})
export class Turnos {
  tratamientos = signal<any[]>([]);
  profesionales = signal<any[]>([]);
  mensaje = signal('');
  error = signal('');

  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:3000/tratamientos')
      .subscribe(datos => this.tratamientos.set(datos));

    this.http.get<any[]>('http://localhost:3000/profesionales')
      .subscribe(datos => this.profesionales.set(datos));
  }

  reservar(nombre: string, apellido: string, email: string, telefono: string,
           idTratamiento: number, idProfesional: number,
           fecha: string, hora: string, observaciones: string) {

    const datos = {
      nombre, apellido, email, telefono,
      idTratamiento: Number(idTratamiento),
      idProfesional: Number(idProfesional),
      fecha, hora, observaciones
    };

    this.http.post('http://localhost:3000/turnos', datos).subscribe({
      next: () => {
        this.mensaje.set('Tu turno quedó reservado. Te esperamos.');
        this.error.set('');
      },
      error: () => {
        this.error.set('No se pudo reservar el turno. Revisá los datos.');
        this.mensaje.set('');
      }
    });
  }

  cargarProfesionales(idTratamiento: number) {
    this.http.get<any[]>('http://localhost:3000/profesionales/tratamiento/' + idTratamiento)
        .subscribe(datos => this.profesionales.set(datos));
    }
}