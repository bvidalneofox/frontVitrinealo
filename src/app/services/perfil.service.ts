import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/perfil.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  color: string = '';

  constructor(private http: HttpClient) { }

  setPerfil(perfil: Perfil){

    let url = `${environment.url}perfil`;

    return this.http.post(url, perfil);

  }

  getPerfiles(): Observable<any>{

    let url = `${environment.url}perfil`;

    return this.http.get(url);
    
  }

  getPerfilesPorComuna(id: string): Observable<any>{

    let url = `${environment.url}perfil/perfilPorComuna/${id}`;

    return this.http.get(url);

  }

  getPerfilId(id: string): Observable<any>{

    let url = `${environment.url}perfil/perfilPorId/${id}`;

    return this.http.get(url);

  }

  getPerfilIdUsuario(id: string): Observable<any>{

    let url = `${environment.url}perfil/perfilPorIdUsuario/${id}`;

    return this.http.get(url);

  }

  actualizarPerfil(perfil: Perfil){

    let url = `${environment.url}perfil/${perfil._id}`;

    return this.http.put(url, perfil);

  }

}
