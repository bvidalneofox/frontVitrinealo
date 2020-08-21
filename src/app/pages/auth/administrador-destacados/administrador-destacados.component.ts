import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administrador-destacados',
  templateUrl: './administrador-destacados.component.html',
  styleUrls: ['./administrador-destacados.component.css']
})
export class AdministradorDestacadosComponent implements OnInit {

  perfil: Perfil = new Perfil();

  constructor(
    public _perfilService: PerfilService,
    public _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
    console.log(this.perfil)

  }


  getPerfilIdUsuario() {
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
    });
  }

}
