import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tratamientos-admin',
  imports: [RouterLink],
  templateUrl: './tratamientos.html',
  styleUrl: './tratamientos.css'
})
export class TratamientosAdmin {
  tratamientos = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>('http://localhost:3000/tratamientos')
      .subscribe(datos => this.tratamientos.set(datos));
  }

  borrar(id: number) {
    this.http.delete('http://localhost:3000/tratamientos/' + id)
      .subscribe(() => this.cargar());
  }
}