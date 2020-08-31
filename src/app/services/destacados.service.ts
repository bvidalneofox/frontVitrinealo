import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../models/publicacion.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestacadosService {

  constructor(private http: HttpClient) { }

  getPublicaciones(perfil): Observable<any> {
    
    let url = `${environment.url}publicacion/`+perfil;

    return this.http.get(url);

  }

  solicitar(Publicacion): Observable<any>{
    let url = `${environment.url}destacados`;

    return this.http.post(url, Publicacion);
  }

  pendientes(perfil): Observable<any> {
  
    let url = `${environment.url}destacados/pendientes/`+perfil;
    console.log(url);
    return this.http.get(url);
  }
  
  
  mod_pendientes(): Observable<any> {

    let url = `${environment.url}destacados/pendientes`;
    console.log(url);
    return this.http.get(url);
  }
  mod_destacando(): Observable<any> {

    let url = `${environment.url}destacados/destacando`;
    console.log(url);
    return this.http.get(url);
  }

  destacar(data): Observable <any>{
    let url = `${environment.url}destacados/destacar`;
    return this.http.post(url, data);
  }
}
