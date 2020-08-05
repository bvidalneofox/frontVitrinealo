import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  setUsuario(usuario: Usuario){

    let url = `${environment.url}usuario`;

    return this.http.post(url, usuario);

  }

  getUsuarios(id: string){

    let url = `${environment.url}usuario`;

    return this.http.get(url);

  }

  actualizarUsuario(usuario: Usuario){

    let url = `${environment.url}usuario`;

    return this.http.put(url, usuario);

  }

}
