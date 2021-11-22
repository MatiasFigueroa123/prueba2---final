import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  listado=[];
  constructor( public storage: Storage) { 
    this.init();
  }

  async init(){
    await this.storage.create();
  }
  async agregarPosts(id:string,valor: any){
    await this.storage.set(id, valor)
  }
  //obtener los datos dentro del local storage
  async recuperar(user:string){
    return await this.storage.get(user);
  }
  listar(){
    
    this.storage.forEach((v,k)=> {this.listado.push(v);})
    return this.listado;
  }
  //eliminar un elemento del local storage por su id
  eliminar(key: string){
    this.storage.remove(key);
  }
}
