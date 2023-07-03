import { Component } from '@angular/core';
import { Palabra } from 'src/app/models/palabra';
import { Jugador } from 'src/app/models/jugador';
import { PalabraService } from 'src/app/providers/palabra.service';
import { JugadorService } from 'src/app/providers/jugador.service';


@Component({
  selector: 'app-ingresar-palabra',
  templateUrl: './ingresar-palabra.component.html',
  styleUrls: ['./ingresar-palabra.component.css']
})
export class IngresarPalabraComponent {

  arrCoincidencias: string[] = []; // esto es para corregir!
  arrAdivinar: string[] = [];
  intentos: string[] = [];
  imagen = [
    '../../../assets/images/5.png',
    '../../../assets/images/4.png',
    '../../../assets/images/3.png',
    '../../../assets/images/2.png',
    '../../../assets/images/1.png',
    '../../../assets/images/0.png',
    '../../../assets/images/perdiste.gif',
    '../../../assets/images/ganaste.png',
  ];
  title = 'ahorcadoAngular';
  palabraAdivinar= '';
  letra = '';
  idx = 0;
  input = true;
  juegoTerminado = false;
  juegoGanado = false;

  jugadorNuevo = "";
  puntosJugador = 0;
  arrJugadores: Jugador[] = [];

  constructor(private db: PalabraService, private jugadorService: JugadorService){
    this.db.getConexion().then( ()=>{
      console.log('conexion exitosa!');
      this.setPalabra(this.db.getPalabraAleatoria());
    }).catch( (err)=>{
      console.log(err);
    });

    this.jugadorService.getConexion().then( ()=>{
      console.log('conexion exitosa!');
      this.arrJugadores = this.jugadorService.getArrJugadores();
    }).catch( (err)=>{
      console.log(err);
    });

  }

  setPalabra(palabra: string){
    this.palabraAdivinar = palabra;
    this.arrAdivinar = palabra.split('');
    console.log(this.arrAdivinar);
    this.setArrAdivinar();
  }

  setArrAdivinar(){
    this.arrAdivinar.forEach( (letra)=>{
      this.arrCoincidencias.push('_');
    });
  }

  revisarPalabra(){
    let aciertos = 0;
    this.intentos.push(this.letra);
    this.arrAdivinar.forEach((letra, index: number)=>{
      if(this.letra === letra){
        this.arrCoincidencias[index] = letra;
        aciertos++;
        this.puntosJugador++;
      }
    });
    if(aciertos == 0){
      this.vidas();
    }
    this.reset();
    this.gameOver();
  }

  vidas(){
    this.idx ++;
    console.log(this.idx);
  }

  reset(){
    setTimeout( ()=>{
      this.letra = '';
    },50);
  }

  gameOver(){
    if(this.idx > 5){
      this.juegoTerminado = true;
      this.input = false;
    }else{
      this.ganarJuego();
    }
  }

  ganarJuego(){
    let ganar = 0;
    this.arrCoincidencias.forEach( (letra) => {
      if(letra == "_"){
        ganar++;
      }
    });
    if(ganar < 1){
      this.input = false;
      this.juegoGanado = true;
    }
  }

  //FUNCIONES DE JUGADOR

  guardarNombre() {
    const jugador = new Jugador(this.jugadorNuevo,this.puntosJugador);
    this.jugadorService.agregarJugador(jugador)
      .then(() => {
        console.log('Nombre de usuario guardado exitosamente');
      })
      .catch(error => {
        console.log('Error al guardar el nombre de usuario:', error);
      });
  }

  aumentarPuntos(jugadorId: number) {
    this.jugadorService.incrementarPuntos(jugadorId)
      .then(() => {
        console.log('Puntos actualizados exitosamente');
      })
      .catch(error => {
        console.log('Error al actualizar puntos:', error);
      });
  }

  bajarPuntos(jugadorId: number) {
    this.jugadorService.incrementarPuntos(jugadorId)
      .then(() => {
        console.log('Puntos actualizados exitosamente');
      })
      .catch(error => {
        console.log('Error al actualizar puntos:', error);
      });
  }

  /*
  reloadPage() {
    window.location.reload();
  }
  */  

}