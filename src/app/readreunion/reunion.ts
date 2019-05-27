import {Foto} from './foto';
export class Reunion {
  constructor(id:string, tema:string,fecha:string,numFotos:number){
    this.id = id;
    this.fecha=fecha;
    this.tema=tema;
    this.numFotos = numFotos;
  }
  numFotos:number;
  id:string;
  idReunion:string;
  tema:string;
  fecha:string;
  fotos:Foto[];
}
