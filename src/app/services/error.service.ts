import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorBack } from '../models/error.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private http: HttpClient) { }

  setError(error: ErrorBack){

    console.log(error);

    let url = `${environment.url}error`;

    return this.http.post(url, error);

  }

  getErrores(): Observable<any>{

    let url = `${environment.url}error`;

    return this.http.get(url);

  }

}
