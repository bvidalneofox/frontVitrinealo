import { Component, OnInit } from '@angular/core';
import { RegionService } from './services/region.service';
import { ComunaService } from './services/comuna.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontEmprendeApp';

  constructor(
    public _regionService: RegionService,
    public _comunaService: ComunaService
  ){}

  ngOnInit(){

    this.getRegiones();

  }

  getRegiones(){
    this._regionService.getRegiones().subscribe(response => {
      this._regionService.regiones = response.regiones;
    });
  }

}
