import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../models/publicacion.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }

  setPublicacion(publicacion: Publicacion){

    let url = `${environment.url}publicacion`;

    return this.http.post(url, publicacion);

  }

  getPublicaciones(): Observable<any>{

    let url = `${environment.url}publicacion`;

    return this.http.get(url);

  }

  getPublicacionId(id: string): Observable<any>{

    let url = `${environment.url}publicacion/porId/${id}`;

    return this.http.get(url);


  }

  getPublicacionesPerfil(id: string): Observable<any>{

    let url = `${environment.url}publicacion/${id}`;

    return this.http.get(url);

  }

  actualizarPublicacion(publicacion: Publicacion){

    let url =  `${environment.url}publicacion/${publicacion._id}`;

    return this.http.put(url, publicacion);

  }

}
