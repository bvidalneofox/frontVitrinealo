import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = '';
  usuario: Usuario = new Usuario();

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
    ) {
    this.cargarStorage();
  }

  login(usuario: Usuario): Observable<any>{

    let url = `${environment.url}login`;

    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        this.guardarStorage(resp.token, resp.usuario);
        return resp;
      })
    );

  }

  loginGoogle(token: string) {

    let url = `${environment.url}login/google`;

    return this.http.post(url, { token })
    .pipe(
      map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.token, resp.usuario);
        return resp;
      })
    );

  }

  loginFacebook(user: SocialUser){

    let url = `${environment.url}login/facebook`;
    return this.http.post(url, user)
    .pipe(
      map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.token, resp.usuario);
        return resp;
      })
    );
    
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }

  guardarStorage(token: string, usuario: Usuario){

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;

  }


  cargarStorage(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = new Usuario();
    }

  }

}
