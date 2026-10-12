import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profesional-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class ProfesionalForm {
  especialidades = signal<any[]>([]);
  profesional = signal<any>({ nombre: '', apellido: '', imagen: '', idEspecialidad: 0 });
  id = 0;
  error = signal('');

  constructor(private http: HttpClient, private router: Router, ruta: ActivatedRoute) {
    this.http.get<any[]>('http://localhost:3000/especialidades')
      .subscribe(datos => this.especialidades.set(datos));

    this.id = Number(ruta.snapshot.params['id']) || 0;

    if (this.id) {
      this.http.get<any>('http://localhost:3000/profesionales/' + this.id)
        .subscribe(datos => this.profesional.set(datos));
    }
  }

  guardar(nombre: string, apellido: string, imagen: string, idEspecialidad: string) {
    const datos = {
      nombre: nombre,
      apellido: apellido,
      imagen: imagen,
      idEspecialidad: Number(idEspecialidad)
    };

    if (this.id) {
      this.http.put('http://localhost:3000/profesionales/' + this.id, datos)
        .subscribe({
          next: () => this.router.navigate(['/admin/profesionales']),
          error: () => this.error.set('No se pudo guardar')
        });
    } else {
      this.http.post('http://localhost:3000/profesionales', datos)
        .subscribe({
          next: () => this.router.navigate(['/admin/profesionales']),
          error: () => this.error.set('No se pudo guardar')
        });
    }
  }
}