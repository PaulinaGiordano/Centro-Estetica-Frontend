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
  filtroEstado = '';
  filtroFecha = '';

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    const params: any = {};
    if (this.filtroEstado) {
      params.estado = this.filtroEstado;
    }
    if (this.filtroFecha) {
      params.fecha = this.filtroFecha;
    }

    this.http.get<any[]>('http://localhost:3000/turnos', { params })
      .subscribe(datos => this.turnos.set(datos));
  }

  filtrar(estado: string, fecha: string) {
    this.filtroEstado = estado;
    this.filtroFecha = fecha;
    this.cargar();
  }

  limpiar() {
    this.filtroEstado = '';
    this.filtroFecha = '';
    this.cargar();
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