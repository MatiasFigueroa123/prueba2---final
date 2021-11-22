import { Component, OnInit } from '@angular/core';
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSService } from '../login-s.service';
import { ApirestService } from '../apirest.service';
import { StorageService } from '../storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  usuarios=[];
  posts : any;
  datos :any;
  info: any;
  interfaz: any;
  id: any;
  constructor( private alertController: AlertController, private router:Router, private loginservice:LoginSService,
    private api:ApirestService,private storage: StorageService,) { }

  async ngOnInit() {
    this.datos = this.api.datos;
    this.id = String(this.datos.id);
    let id = this.datos.id;
    this.posts = this.api.posts;
    this.info=this.posts.filter(item => item.userId == id);
    await this.storage.agregarPosts(this.id,this.info);
    this.interfaz = await this.storage.recuperar(this.id);
    
    
    
    
    
    

  }
  async cerrar_sesion(){
    const alerta = await this.alertController.create({
      header: "hola!",
      message:"¿quieres cerrar sesión?",
      buttons:[
      {
        text: "si",
        handler: () =>{
          this.storage.eliminar(this.id)//al cerrar sesion se bora el storage
          this.router.navigateByUrl("/login")
        }
      },
      {
        text: "no",
        role: "cancel"
      }
      ]
    })
    await alerta.present();
  }
}
