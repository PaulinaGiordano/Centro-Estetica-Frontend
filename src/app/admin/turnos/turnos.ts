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
    this.http.get<any[]>('http://localhost:3000/turnos')
      .subscribe(datos => this.turnos.set(datos));
  }
}