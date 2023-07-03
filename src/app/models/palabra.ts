export class Palabra{
  palabra: string;
  longitud: number;

  constructor(palabra: string){
    this.palabra = palabra;
    this.longitud = palabra.length;
  }
}
