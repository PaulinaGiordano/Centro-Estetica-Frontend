import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-turnos-admin',
  imports: [DatePipe],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css'
})
export class TurnosAdmin {
  turnos = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>('http://localhost:3000/turnos')
      .subscribe(datos => this.turnos.set(datos));
  }

  borrar(id: number) {
    this.http.delete('http://localhost:3000/turnos/' + id)
      .subscribe(() => this.cargar());
  }

  cambiarEstado(id: number, estado: string) {
    this.http.put('http://localhost:3000/turnos/' + id, { estado })
      .subscribe(() => this.cargar());
  }
}