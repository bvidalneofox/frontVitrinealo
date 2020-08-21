import { Component, OnInit, NgZone } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/notificacion.model';

declare const gapi: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  notificaciones: Notificacion[] = [];
  notificacionesNuevas: Notificacion[] = [];

  auth2: any;

  constructor(
    public _loginService: LoginService,
    public _perfilService: PerfilService,
    public _notificacionService: NotificacionService,
    public route: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.googleInit();
    if (this._loginService.usuario._id) {
      this.getNotificaciones();
    }
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

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let token = googleUser.getAuthResponse().id_token;

      this._loginService.loginGoogle(token).subscribe(response => {
        this.ngZone.run(() =>
          this.route.navigate(['miPerfil'])
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
    this.route.navigate(['/']);
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
      console.log(response);
    });
  }

}
