import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient) { }


  postear(data): Observable<any>{
    let url = `${environment.url}foro/postear`;

    return this.http.post(url, data);
  }

  foro(): Observable<any>{

    let url = `${environment.url}foro/foro_all`;

    return this.http.get(url);

  }

  
}
