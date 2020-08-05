import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = '';
  usuario: Usuario = new Usuario();

  constructor(private http: HttpClient) {
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
