import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-componente',
  templateUrl: './perfil-componente.component.html',
  styleUrls: ['./perfil-componente.component.css']
})
export class PerfilComponenteComponent implements OnInit {

  @Input() perfil: Perfil = new Perfil();

  constructor(
    public _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this._perfilService.color = this.perfil.color;
  }

  ngOnDestroy(): void {
    this._perfilService.color = null;
  }

}
