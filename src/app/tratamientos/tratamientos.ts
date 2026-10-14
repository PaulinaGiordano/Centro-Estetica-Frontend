import { HttpClient } from "@angular/common/http";
import { Component, signal } from "@angular/core";

@Component({
    selector:'app-tratamientos',
    templateUrl: './tratamientos.html',
    styleUrl:'./tratamientos.css'
})

export class Tratamientos{
    titulo="Nuestros Tratamientos";
    tratamientos = signal <any[]>([]);
    
    constructor (http:HttpClient){
        http.get<any[]>('http://localhost:3000/tratamientos')
        .subscribe(datos => this.tratamientos.set(datos));
    }
    
}