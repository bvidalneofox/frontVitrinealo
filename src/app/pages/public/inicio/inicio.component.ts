import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { ComunaService } from 'src/app/services/comuna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
