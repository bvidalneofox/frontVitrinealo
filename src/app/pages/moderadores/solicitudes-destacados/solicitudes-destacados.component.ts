import { Component, OnInit } from '@angular/core';
import { DestacadosService } from '../../../services/destacados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-destacados',
  templateUrl: './solicitudes-destacados.component.html',
  styleUrls: ['./solicitudes-destacados.component.css']
})
export class SolicitudesDestacadosComponent implements OnInit {

  json_pendientes:any;
  json_destacando:any;
  data_modal= {
    "_id": "",
    "estado": "",
    "semana": 0,
    "publicacion": {
      "_id": "",
      "publico": false,
      "contador": 0,
      "estado": "",
      "titulo": "",
      "descripcion": "",
      "precio": 0,
      "perfil": "",
      "createdAt": "",
      "updatedAt": "",
      "__v": 0,
      "foto1Url": ""
    },
    "createdAt": "",
    "updatedAt": "",
    "__v": 0,
    "perfil": [
      {
        "_id": "",
        "publico": false,
        "nombre": "",
        "descripcion": "",
        "facebookUrl": "",
        "contacto": "",
        "color": "",
        "usuario": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0,
        "bannerUrl": "",
        "contador": 0,
        "estado": ""
      }
    ]
  };
  desde="";
  hasta="";
    

  constructor(public _Destacados: DestacadosService) { }

  ngOnInit(): void {
    this.pendientes();
    this.destacando();
  }

  pendientes() {
    // alert(this.perfil._id)
    this._Destacados.mod_pendientes().subscribe(res => {
      this.json_pendientes = res.destacados;
    });
  }

  destacando() {
    // alert(this.perfil._id)
    this._Destacados.mod_destacando().subscribe(res => {
      if(res.ok){
        this.json_destacando = res.destacados;
      }
    });
  }

  llenar_modal(json_pendientes){
    this.data_modal = json_pendientes;
  }

  destacar(destacado_id){
    
    if(this.desde=='' || this.hasta==""){
      alert("Falta alguna fecha")
      return false;
    }else{
      const data = {
        destacado_id: destacado_id,
        desde: this.desde,
        hasta: this.hasta
      }
      this._Destacados.destacar(data).subscribe(res => {
        if(res.ok){
          Swal.fire('Bien!', res.mensaje, 'success');
          let button: HTMLElement = document.getElementById("cerrar") as HTMLElement;
          console.log(button)
          button.click();
          this.pendientes();
          this.destacando();
         
        }
        else{
          Swal.fire('Upss!', res.mensaje, 'error');
        }
        // Swal.fire('¡Rechazado!', 'Se le informará al usuario el motivo por el cual se ha rechazado su producto.', 'success');
      })
    }
  }

}
