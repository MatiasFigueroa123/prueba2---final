import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  datos: any
  posts: any
  info : any
  comentarios: any
  constructor(private storage: StorageService, private router: ActivatedRoute,private api:ApirestService,) { }

  ngOnInit() {
    this.leerComentatios();
    
    
    
  }
  async leerComentatios(){
    let id = "";
    this.router.paramMap.subscribe(async parametros => {
      id = parametros.get("id");
    });
    this.comentarios = this.api.comentarios;//obtener todos los post realizados
    this.info =this.comentarios.filter(item => item.postId ==id)
    
    
    
    
    
    
    
    
  }
}
