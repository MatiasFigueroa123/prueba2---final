import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from './crud-service.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  rut: string;
  nombre: string;
  fono: string;

  constructor(private crud: CrudServiceService, 
              private toast: ToastController) { }

  ngOnInit() {
    /*
    this.crud.agregar("1", "Juan");    
    const valor = this.crud.obtener("1");
    valor.then(x => console.log(x));

    */
    // TAREA: Como obtener el rut y nombre de Juan
    // nombre : Juan
    // rut : 1-9
  }
  async agregar(txtRut:HTMLInputElement, txtNombre:HTMLInputElement, txtFono:HTMLInputElement)
  {
    // crear formato para almacenar todos estos datos
    const datos = [{"rut": txtRut.value, "nombre": txtNombre.value, "fono": txtFono.value }];
    this.crud.agregar(datos);
    txtRut.value = "";
    txtNombre.value = "";
    txtFono.value = "";
    const toast = await this.toast.create({
      message: 'Los datos fueron guardados.',
      duration: 2000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }
  buscar(txtRut:HTMLInputElement)
  {
    this.crud.obtener(txtRut.value);
    this.rut = this.crud.dato[0][0].rut;
    this.nombre = this.crud.dato[0][0].nombre;
    this.fono = this.crud.dato[0][0].fono;
  }
}
