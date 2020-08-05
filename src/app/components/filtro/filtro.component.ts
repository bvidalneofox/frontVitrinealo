import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { ComunaService } from 'src/app/services/comuna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  constructor(
    public _regionService: RegionService,
    public _comunaService: ComunaService,
    public route: Router
  ) { }

  ngOnInit(): void {
  }

}
