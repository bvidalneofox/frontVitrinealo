import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notificacion } from '../models/notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private http: HttpClient) { }

  getNotificacionesUsuario(id: string): Observable<any>{

    let url = `${environment.url}notificacion/${id}`;

    return this.http.get(url);

  }

  setNotificacion(notificacion: Notificacion){

    let url = `${environment.url}notificacion`;

    return this.http.post(url, notificacion);

  }

  actualizarNotificacion(notificacion: Notificacion){

    let url = `${environment.url}notificacion/${notificacion._id}`;

    return this.http.put(url, notificacion);

  }

}
