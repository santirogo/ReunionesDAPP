export class Foto {
  hash: string; 
  url:string;
  id:string;

  constructor(id:string,url:string,hash: string){
    this.id = id;
    this.url = url;
    this.hash = hash;
  }
}