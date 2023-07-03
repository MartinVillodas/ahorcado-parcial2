import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ahorcadoAngular';
  arrCoincidencias = []; // esto es para corregir!
  palabraAdivinar = '';

  componenteAgregar = false;
  componenteJugar = true;

  constructor(){

  }

  agregarPalabras(){
    this.componenteAgregar = true;
    this.componenteJugar = false;
  }

  regresarJuego(){
    this.componenteAgregar = false;
    this.componenteJugar = true;
  }

}