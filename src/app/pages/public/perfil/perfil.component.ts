import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/models/perfil.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();
  productos: Publicacion[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public _perfilService: PerfilService,
    public _productosService: PublicacionService
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.getPerfil(params['id']);
      this.getProductos(params['id']);
    });

  }

  ngOnInit(): void {
  }

  getPerfil(id: string){
    this._perfilService.getPerfilId(id).subscribe(response => {
      this.perfil = response.perfil;
    });
  }

  getProductos(id: string){
    this._productosService.getPublicacionesPerfil(id).subscribe(response => {
      this.productos = response.publicaciones;
      this.productos = this.productos.filter(producto => producto.estado == 'A');
    });
  }

}
