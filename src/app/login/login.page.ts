import { Component, OnInit } from '@angular/core';
//importando alert
import { alertController } from '@ionic/core';
import { ToastController } from '@ionic/angular';
//enlaces
import { Router, RouterLink } from '@angular/router';
import { LoginSService } from '../login-s.service';
///importando apiRest
import { ApirestService } from '../apirest.service';
//importar storage
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user: string;
  pass: string;
  listado: any;
  usuarios:any;
  datos:any;

  constructor( private toastController: ToastController,
                private storage: StorageService,
               private router: Router,
               private loginservice:LoginSService,
                private api:ApirestService,
                ) { }

  ngOnInit() {
    this.storage.init();
    this.api.getUsers();
    this.api.getPost();
    this.api.getComentarios();
    
    
  }
  async recuperar(user: HTMLInputElement){
    let usuario = user.value;
    this.api.getUsers();
    this.listado = this.api.listado;
    if(this.listado.find(item => item.username == usuario)){
      const alerta = await this.toastController.create({
        message: 'tu nueva contraseña a sido enviada a tu email',
        duration: 3000,
        color: 'warning'
      });
      await alerta.present();
    }else if(usuario == ""){
      const alert = await this.toastController.create({
        message: 'debes ingresar tu usuario antes de clickearme',
        duration: 3000,
        color: 'danger'
      });
      await alert.present();
    }else{
      const a = await this.toastController.create({
        message: 'usted no cuenta con una cuenta Duoc',
        duration: 3000,
        color: 'danger'
      });
      await a.present();
    }
  }
  //INICIAR > Se crea un listado para almacenar la informacion de los usuarios de la API, los cuales seran comparados para la validacion del login. Se guarda la id del usuario para su uso en el servicio
  async iniciar(user: HTMLInputElement,
    pass:HTMLInputElement){
    this.listado = this.api.listado;
    let usuario = user.value;
    let contraseña =pass.value;
    if(this.listado.find(item => item.username == usuario)&& this.loginservice.getcontraseña(contraseña) ){
      this.usuarios=this.listado.find(item => item.username == usuario); 
      let id = this.usuarios.id 
      this.api.getDatosUser(id);
      this.datos = this.api.datos;
      this.router.navigateByUrl("/bienvenida");
      pass.value= "";
      user.value = "";
      
    }else if(usuario == "" || contraseña==""){
      const error1 = await this.toastController.create({
      message: 'Ambos campos deben ser rellenados correctamente',
      duration: 3000,
      color: 'warning'
      });
      await error1.present();
    }
    
    else{
      const error2 = await this.toastController.create({
      message: 'Contraseña y usuario incorrecto intente nuevamente',
      duration: 3000,
      color: 'danger'
    });
      await error2.present();
    }
  }
}
