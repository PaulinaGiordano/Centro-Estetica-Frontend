import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-horarios-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
})
export class HorariosAdmin {
  idProfesional = 0;
  profesional = signal<any>(null);
  horarios = signal<any[]>([]);
  editando = signal<any>(null);
  error = signal('');
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  constructor(
    private http: HttpClient,
    ruta: ActivatedRoute,
  ) {
    this.idProfesional = Number(ruta.snapshot.params['id']);

    this.http
      .get<any>('http://localhost:3000/profesionales/' + this.idProfesional)
      .subscribe((datos) => this.profesional.set(datos));

    this.cargar();
  }

  cargar() {
    this.http
      .get<any[]>('http://localhost:3000/horarios/profesional/' + this.idProfesional)
      .subscribe((datos) => this.horarios.set(datos));
  }

  editar(horario: any) {
    this.editando.set(horario);
    this.error.set('');
  }

  cancelar(formulario: HTMLFormElement) {
    this.editando.set(null);
    this.error.set('');
    formulario.reset();
  }

  guardar(dia: string, inicio: string, fin: string, formulario: HTMLFormElement) {
    const datos = {
      idProfesional: this.idProfesional,
      dia_semana: dia,
      hora_inicio: inicio,
      hora_fin: fin,
    };

    const pedido = this.editando()
      ? this.http.put('http://localhost:3000/horarios/' + this.editando().idHorario, datos)
      : this.http.post('http://localhost:3000/horarios', datos);

    pedido.subscribe({
      next: () => {
        this.editando.set(null);
        this.error.set('');
        formulario.reset();
        this.cargar();
      },
      error: (e) => this.error.set(e.error?.mensaje || 'No se pudo guardar el horario'),
    });
  }

  borrar(id: number) {
    this.http.delete('http://localhost:3000/horarios/' + id).subscribe(() => this.cargar());
  }
}
