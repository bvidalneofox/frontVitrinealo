import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    public _loginService: LoginService
    ) { }

  setUsuario(usuario: Usuario){

    let url = `${environment.url}usuario`;

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this._loginService.guardarStorage(resp.token, resp.body);
        return resp;
      })
    );

  }

  getUsuarios(id: string){

    let url = `${environment.url}usuario`;

    return this.http.get(url);

  }

  actualizarUsuario(usuario: Usuario){

    let url = `${environment.url}usuario/${usuario._id}`;

    return this.http.put(url, usuario);

  }

}
