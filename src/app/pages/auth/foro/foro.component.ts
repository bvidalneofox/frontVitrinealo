import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ForoService } from 'src/app/services/foro.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  perfil: Perfil = new Perfil();
  res;
  comentario='';
  get_data:any;
  constructor(
    public _perfilService: PerfilService,  
    public _loginService: LoginService,
    public _Foro: ForoService  
  ) { }

  ngOnInit(): void {

    this.getPerfilIdUsuario();

    this.get_foro();
  }

  getPerfilIdUsuario() {
    this.res=false;
      this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.res=true;
      this.perfil = response.perfil; 

      console.log("abajo algo:");
      console.log(this.perfil);
      
      this._perfilService.color = response.perfil.color;
        
      
    });
  }

  btn_postear(){

    if(this.comentario.trim() == ''){
      alert("Ingrese un comentario..");
      return false;
    }

    const data = {
      usuario: this.perfil.usuario,
      comentario: this.comentario
    };

    this._Foro.postear(data).subscribe(res =>{
      if(res.ok){
        Swal.fire(
          'Bien!',
          ''+res.mensaje+'',
          'success'
        )
          this.comentario = '';
          this.get_foro()
        // let button: HTMLElement = document.getElementById("cerrar") as HTMLElement;
        // button.click();
      }else{
        Swal.fire(
          'Upps',
          ''+res.mensaje+'',
          'error'
        )
      }
    })
  }

  get_foro(){

    this._Foro.foro().subscribe(res=>{
      if(res.ok){
        this.get_data = res.foro;
      }
    });
  }

}
