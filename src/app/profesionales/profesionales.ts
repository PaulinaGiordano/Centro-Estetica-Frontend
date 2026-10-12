import { HttpClient } from "@angular/common/http";
import { Component, signal } from "@angular/core";

@Component({
    selector: 'app-profesionales',
    templateUrl: './profesionales.html',
    styleUrl: './profesionales.css'
})

export class Profesionales {
    titulo = 'Nuestros profesionales';
    profesionales = signal<any[]>([]);

    constructor (http:HttpClient){
        http.get<any[]>('http://localhost:3000/profesionales')
        .subscribe(datos => this.profesionales.set(datos));
    }
}