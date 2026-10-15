import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tratamiento-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './tratform.html',
  styleUrl: './tratform.css'
})
export class TratamientoForm {
  especialidades = signal<any[]>([]);
  tratamiento = signal<any>({ nombre: '', descripcion: '', duracion: 0, idEspecialidad: 0 });
  id = 0;
  error = signal('');

  constructor(private http: HttpClient, private router: Router, ruta: ActivatedRoute) {
    this.http.get<any[]>('http://localhost:3000/especialidades')
      .subscribe(datos => this.especialidades.set(datos));

    this.id = Number(ruta.snapshot.params['id']) || 0;

    if (this.id) {
      this.http.get<any>('http://localhost:3000/tratamientos/' + this.id)
        .subscribe(datos => this.tratamiento.set(datos));
    }
  }

  guardar(nombre: string, descripcion: string, duracion: number, idEspecialidad: number) {
    const datos = {
      nombre: nombre,
      descripcion: descripcion,
      duracion: Number(duracion),
      idEspecialidad: Number(idEspecialidad)
    };

    if (this.id) {
      this.http.put('http://localhost:3000/tratamientos/' + this.id, datos)
        .subscribe({
          next: () => this.router.navigate(['/admin/tratamientos']),
          error: () => this.error.set('No se pudo guardar')
        });
    } else {
      this.http.post('http://localhost:3000/tratamientos', datos)
        .subscribe({
          next: () => this.router.navigate(['/admin/tratamientos']),
          error: () => this.error.set('No se pudo guardar')
        });
    }
  }
}