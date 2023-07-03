import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction} from '@angular/fire/compat/database';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  jugadores: any[] = [];

  constructor(private afs: AngularFireDatabase) {
    
  }

  getConexion(){
    return new Promise( (resolve, reject)=>{
      this.afs.object('jugadores/').snapshotChanges().subscribe( (datos: any) => {
      console.log(datos);
      if(datos.payload.exists()){
        resolve(this.jugadores = datos.payload.val());
      }else{
        reject(new Error('Ocurrió un problema en BD'));
      }
      });
    });
  }

  guardarNombreUsuario() {
    //const uid = this.generarUID();
    return this.afs.object(`jugadores/`).set(this.jugadores);
  }

  getArrJugadores(): Jugador[]{
    return this.jugadores;
  }

  agregarJugador(j: Jugador){
    this.jugadores.push(j);
    return this.guardarNombreUsuario();
  }
  
  incrementarPuntos(jugadorId: number): Promise<void> {
    const puntosRef = this.afs.object(`jugadores/${jugadorId}/puntos`);
    return puntosRef.query.ref.transaction((puntosActuales: number) => {
      return (puntosActuales || 0) + 1;
    }).then(() => {
      console.log('Puntos actualizados exitosamente');
    }).catch(error => {
      console.log('Error al actualizar puntos:', error);
      throw error;
    });
  }

  disminuirPuntos(jugadorId: number): Promise<void> {
    const puntosRef = this.afs.object(`jugadores/${jugadorId}/puntos`);
    return puntosRef.query.ref.transaction((puntosActuales: number) => {
      return (puntosActuales || 0) - 1;
    }).then(() => {
      console.log('Puntos actualizados exitosamente');
    }).catch(error => {
      console.log('Error al actualizar puntos:', error);
      throw error;
    });
  }
  
}