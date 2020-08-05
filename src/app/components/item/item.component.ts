import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() perfil: Perfil = new Perfil();

  constructor() { }

  ngOnInit(): void {
  }

}
