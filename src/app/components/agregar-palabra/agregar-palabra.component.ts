import { Component } from '@angular/core';
import { Palabra } from 'src/app/models/palabra';
import { PalabraService } from 'src/app/providers/palabra.service';

@Component({
  selector: 'app-agregar-palabra',
  templateUrl: './agregar-palabra.component.html',
  styleUrls: ['./agregar-palabra.component.css']
})
export class AgregarPalabraComponent {

  palabraNueva= '';
  alertErr = false;
  alertOk = false;
  arrPalabras: Palabra[] = [];

  constructor(private palabraServ: PalabraService){
    this.palabraServ.getConexion().then( ()=>{
      console.log('conexion exitosa!');
      this.arrPalabras = this.palabraServ.getArrPalabras();
    }).catch( (err)=>{
      console.log(err);
    });

  }

  AgregarPalabra(){
    console.log(this.palabraNueva);
    this.palabraServ.agregarPalabra(this.palabraNueva).then( ()=>{
      this.alertOk = true;
      setTimeout( ()=>{
        this.alertOk = false;
        this.palabraNueva = '';
      },2000);
    }).catch( ()=>{
      this.alertErr = true;
      setTimeout( ()=>{
        this.alertErr = false;
      },2000);
    });
  }


}
