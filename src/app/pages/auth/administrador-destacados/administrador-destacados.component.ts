import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { DestacadosService } from '../../../services/destacados.service';
import { Publicacion } from 'src/app/models/publicacion.model';


@Component({
  selector: 'app-administrador-destacados',
  templateUrl: './administrador-destacados.component.html',
  styleUrls: ['./administrador-destacados.component.css']
})
export class AdministradorDestacadosComponent implements OnInit {

  perfil: Perfil = new Perfil();
  res;
  no_destacados:any;
  semanas='1';
  publicacion: Publicacion = new Publicacion;
  json_pendientes:any
  

  constructor(
    public _perfilService: PerfilService,
    public _loginService: LoginService,
    public _Destacados: DestacadosService
  ) { }

  ngOnInit(): void {

    this.getPerfilIdUsuario()
   
    
    
    

  }
  

   getPerfilIdUsuario() {
    this.res=false;
      this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.res=true;
      this.perfil = response.perfil; 
      
      this._perfilService.color = response.perfil.color;

      this.getPublicaciones_sin_destacar(this.perfil._id);
    });
  }

  getPublicaciones_sin_destacar(perfil_id){
  
    this._Destacados.getPublicaciones(perfil_id).subscribe(res =>{
      this.no_destacados = res.publicaciones;
      console.log(this.no_destacados)
    })
  }

  pendientes(){
    // alert(this.perfil._id)
    this._Destacados.pendientes(this.perfil._id).subscribe(res => {
      this.json_pendientes = res.destacados;
    });
  }

  datos(p){
    this.publicacion = p;
  }

  solicitar(p){
   
    
    const data = {
      _id: p._id,
      semana: this.semanas
    }
    // console.log(data)
    // return false;

    Swal.fire({
      title: '¿Esta seguro de enviar la saolicitud para un destacado?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, solicitar!',
      cancelButtonText: 'No, pa la otra'
    }).then((result) => {
      if (result.value) {
        this._Destacados.solicitar(data).subscribe(res => {
          if(res.ok){
            Swal.fire(
              'Bien!',
              'Tu solicitud fue enviada a los administradores.',
              'success'
            )
          }else{
            Swal.fire(
              'Upps',
              'No se completó sa solicitud',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Bien',
          'Para la proxima será :)',
          'error'
        )
      }
    })
  }

  

}
