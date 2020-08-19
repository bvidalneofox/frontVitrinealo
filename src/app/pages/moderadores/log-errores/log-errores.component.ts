import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { ErrorBack } from 'src/app/models/error.model';

@Component({
  selector: 'app-log-errores',
  templateUrl: './log-errores.component.html',
  styleUrls: ['./log-errores.component.css']
})
export class LogErroresComponent implements OnInit {

  errores: ErrorBack[] = [];

  constructor(
    public _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getErrores();
  }

  getErrores(){
    this._errorService.getErrores().subscribe(response => {
      this.errores = response.errores;
    });
  }

}
