import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  perfiles: Perfil[] = [];
  publicaciones: Publicacion[] = [];
  loading: boolean = true;
  vistaPerfil: boolean = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _perfilService: PerfilService,
    public _publicacionesService: PublicacionService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.getPerfiles(params['id']);
    });
  }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPerfiles(id: string){
    this.loading = true;
    this._perfilService.getPerfilesPorComuna(id).subscribe(response => {
      this.perfiles = response.perfiles;
      this.loading = false;
    });
  }

  getPublicaciones(){
    this._publicacionesService.getPublicaciones().subscribe(response => {
      this.publicaciones = response.publicaciones;
    });
  }

}
