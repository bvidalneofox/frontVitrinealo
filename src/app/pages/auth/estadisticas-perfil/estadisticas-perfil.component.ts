import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { LoginService } from 'src/app/services/login.service';
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-estadisticas-perfil',
  templateUrl: './estadisticas-perfil.component.html',
  styleUrls: ['./estadisticas-perfil.component.css']
})
export class EstadisticasPerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();

  array = new Array(3);

  constructor(
    public _perfilService: PerfilService,
    public _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
  }

  getPerfilIdUsuario() {
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
    });
  }

}
