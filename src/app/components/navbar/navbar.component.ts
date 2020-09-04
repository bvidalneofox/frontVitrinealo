import { Component, OnInit, NgZone } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/notificacion.model';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

declare const gapi: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  user: SocialUser;
  loggedIn: boolean;

  notificaciones: Notificacion[] = [];
  notificacionesNuevas: Notificacion[] = [];

  auth2: any;

  constructor(
    public _loginService: LoginService,
    public _perfilService: PerfilService,
    public _notificacionService: NotificacionService,
    public route: Router,
    private ngZone: NgZone,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {

    this.googleInit();

    if (this._loginService.usuario._id) {
      this.getNotificaciones();
    }

    if(!this._loginService.isAuthenticated()){
      this.logout();
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      console.log(this.loggedIn);

      this._loginService.loginFacebook(this.user).subscribe(response => {
        this.route.navigate(['miPerfil/inicio'])
      });

    });

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1077143188123-rbb16ef4u5m1djrbkauhnlak6ehuaobk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  fbLogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let token = googleUser.getAuthResponse().id_token;

      this._loginService.loginGoogle(token).subscribe(response => {
        this.ngZone.run(() =>
          this.route.navigate(['miPerfil/inicio'])
        );
      }, error => {
        console.log(error);
      });

      console.log(token);

    });
  }

  login() {
    this._loginService.login(this.usuario).subscribe(response => {
      this.route.navigate(['miPerfil/inicio']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._loginService.usuario = new Usuario();
    this._loginService.token = null;
    // this.route.navigate(['/']);
  }

  getNotificaciones() {
    this._notificacionService.getNotificacionesUsuario(this._loginService.usuario._id).subscribe(response => {
      this.notificaciones = response.notificaciones;
      this.notificacionesNuevas = this.notificaciones.filter(notificacion => !notificacion.revisado);
    });
  }

  actualizarNotificacion(notificacion: Notificacion) {
    notificacion.revisado = true;
    this._notificacionService.actualizarNotificacion(notificacion).subscribe(response => {
      this.getNotificaciones();
    });
  }

}
