import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profesionales-admin',
  imports: [RouterLink],
  templateUrl: './profesionales.html',
  styleUrl: './profesionales.css'
})
export class ProfesionalesAdmin {
  profesionales = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>('http://localhost:3000/profesionales')
      .subscribe(datos => this.profesionales.set(datos));
  }

  borrar(id: number) {
    this.http.delete('http://localhost:3000/profesionales/' + id)
      .subscribe(() => this.cargar());
  }
}