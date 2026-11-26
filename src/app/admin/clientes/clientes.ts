import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesAdmin {
  clientes = signal<any[]>([]);
  editando = signal<any>(null);
  error = signal('');

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar() {
    this.http
      .get<any[]>('http://localhost:3000/clientes')
      .subscribe((datos) => this.clientes.set(datos));
  }

  editar(cliente: any) {
    this.editando.set(cliente);
    this.error.set('');
  }

  cancelar(formulario: HTMLFormElement) {
    this.editando.set(null);
    this.error.set('');
    formulario.reset();
  }

  guardar(
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    contra: string,
    formulario: HTMLFormElement,
  ) {
    const pedido = this.editando()
      ? this.http.put('http://localhost:3000/clientes/' + this.editando().idCliente, {
          nombre,
          apellido,
          email,
          telefono,
        })
      : this.http.post('http://localhost:3000/clientes', {
          nombre,
          apellido,
          email,
          telefono,
          contra,
        });

    pedido.subscribe({
      next: () => {
        this.editando.set(null);
        this.error.set('');
        formulario.reset();
        this.cargar();
      },
      error: (e) => this.error.set(e.error?.mensaje || 'No se pudo guardar el cliente'),
    });
  }

  borrar(id: number) {
    this.http.delete('http://localhost:3000/clientes/' + id).subscribe({
      next: () => {
        this.error.set('');
        this.cargar();
      },
      error: (e) => this.error.set(e.error?.mensaje || 'No se pudo borrar el cliente'),
    });
  }
}
