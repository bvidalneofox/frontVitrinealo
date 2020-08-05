import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    public _loginService: LoginService,
    public _perfilService: PerfilService,
    public route: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this._loginService.login(this.usuario).subscribe(response => {
      this.route.navigate(['miPerfil']);
    });
  }

}
