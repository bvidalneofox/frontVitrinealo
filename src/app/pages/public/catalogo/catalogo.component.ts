import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  perfiles: Perfil[] = [];

  constructor(
    public _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.getPerfiles();
  }

  getPerfiles(){
    this._perfilService.getPerfiles().subscribe(response => {
      this.perfiles = response.perfiles;
    });
  }

}
