import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})


export class Contacto {
  nombre = '';
  email = '';
  mensaje = '';
  enviado = signal(false);

  enviar() {
    this.enviado.set(true);
  }
}