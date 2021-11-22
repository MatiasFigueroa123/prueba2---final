import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApirestService {
  private apiURL = 'https://jsonplaceholder.typicode.com/';

  listado = [];
  datos = [];
  posts = [];
  comentarios= [];

  constructor(private http: HttpClient) { }
  //obtenemos todos los usuarios
  getUsers()
  {
    let url = this.apiURL + 'users';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data:[]) => {
        data.forEach(item => {this.listado.push(item);})
      },
      err => {
        console.log("Ocurrio un error");
      })
    })
  }
  
  //comparamos los datos del listado con el id seleccionado en el login
  getDatosUser(id:string){
    this.datos=this.listado.find(item => item.id ==id);
    return this.datos;

  }
  //se toman todos los post de la api
  getPost(){
    let url2 = this.apiURL + 'posts';
    return new Promise((resolve, reject) => {
      this.http.get(url2).subscribe((data:[]) => {

        data.forEach(item => {this.posts.push(item);})
      },
      err => {
        console.log("Ocurrio un error");
      })
    })
  }

  getComentarios(){
    let url3 = this.apiURL + 'comments';
    return new Promise((resolve, reject) => {
      this.http.get(url3).subscribe((data:[]) => {
        data.forEach(item => {this.comentarios.push(item);})
      },
      err => {
        console.log("Ocurrio un error");
      })
    })
  }
}  

