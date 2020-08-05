import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comuna } from '../models/comuna.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {

  comunas: Comuna[] = [];

  constructor(private http: HttpClient) { }

  setComuna(comuna: Comuna){

    let url = `${environment.url}comuna`;

    return this.http.post(url, comuna);

  }

  getComunas(idRegion: string = ''): Observable<any>{

    let url = `${environment.url}comuna?idRegion=${idRegion}`;

    return this.http.get(url);

  }

  actualizarComuna(comuna: Comuna){

    let url = `${environment.url}comuna`;

    return this.http.put(url, comuna);

  }

  changeRegion(idRegion: string){
    this.getComunas(idRegion).subscribe(response => {
      this.comunas = response.comunas;
    });
  }

}
