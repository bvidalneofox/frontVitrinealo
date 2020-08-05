import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/region.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  regiones: Region[] = [];

  constructor(private http: HttpClient) { }

  setRegion(region: Region){

    let url = `${environment.url}region`;

    return this.http.post(url, region);

  }

  getRegiones(): Observable<any>{

    let url = `${environment.url}region`;

    return this.http.get(url);

  }

  actualizarRegion(region: Region){

    let url = `${environment.url}region`;

    return this.http.put(url, region);

  }

}
