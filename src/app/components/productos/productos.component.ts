import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input() productos: Publicacion[] = [];
  @Input() color: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
