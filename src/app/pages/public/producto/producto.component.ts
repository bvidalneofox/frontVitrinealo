import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: Publicacion = new Publicacion();
  productos: Publicacion[] = [];
  perfil: Perfil = new Perfil();

  constructor(
    public activatedRoute: ActivatedRoute,
    public _publicacionesService: PublicacionService,
    public _perfilService: PerfilService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this._publicacionesService.getPublicacionId(params['id']).subscribe(response => {
        this.producto = response.publicacion;
        this.getPerfil(response.publicacion.perfil);
      });
    });
  }

  ngOnInit(): void {
  }

  getPerfil(id: string){
    this._perfilService.getPerfilId(id).subscribe(response => {
      this.perfil = response.perfil;
      this.getProductos(response.perfil._id);
    });
  }

  getProductos(id: string){
    this._publicacionesService.getPublicacionesPerfil(id).subscribe(response => {
      this.productos = response.publicaciones;
    });
  }

}
