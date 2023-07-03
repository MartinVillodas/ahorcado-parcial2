import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Palabra } from '../models/palabra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  palabras: any[] =[];

  constructor(private afs: AngularFireDatabase) {

    // this.getConexion().then( ()=>{
    //   console.log('conexion exitosa!');
    //   this.getBD();
    // }).catch( (err)=>{
    //   console.log(err);
    // });
  }

  getBD(){
    console.log(this.palabras);
    return this.palabras;
  }

  getConexion(){
      return new Promise( (resolve, reject)=>{
        this.afs.object('palabras/').snapshotChanges().subscribe( (datos: any) => {
        console.log(datos);
        if(datos.payload.exists()){
          resolve(this.palabras = datos.payload.val());
        }else{
          reject(new Error('Ocurrió un problema en BD'));
        }
        });
      });
  }

  updateBD(){
    return this.afs.object('palabras/').set(this.palabras);
  }

  getArrPalabras(): Palabra[]{
    return this.palabras;
  }

  agregarPalabra(palabra: string){
    const p = new Palabra(palabra);
    this.palabras.push(p);
    return this.updateBD();
  }

  getPalabraAleatoria(): string{
    const idx = this.idxAleatorio(this.palabras.length);
    console.log(this.palabras[idx].palabra);
    return this.palabras[idx].palabra;
  }

  idxAleatorio(max: number): number{
    return Math.floor(Math.random() * max);
  }


}