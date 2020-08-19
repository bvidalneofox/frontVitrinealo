import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion.model';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administrador-productos',
  templateUrl: './administrador-productos.component.html',
  styleUrls: ['./administrador-productos.component.css']
})
export class AdministradorProductosComponent implements OnInit {

  perfil: Perfil = new Perfil();

  producto: Publicacion = new Publicacion();
  productos: Publicacion[] = [];
  imagenSubir: File;

  constructor(
    public _publicacionService: PublicacionService,
    public _uploadService: UploadService,
    public _perfilService: PerfilService,
    public _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
  }

  setProducto(f: NgForm) {

    if (f.invalid) {
      Swal.fire('Formulario Incompleto', 'Revise que no falten campos obligatorios por completar', 'error');
      return;
    }

    let idPerfil: any = this.perfil._id;
    this.producto.perfil = idPerfil;

    this._publicacionService.setPublicacion(this.producto).subscribe((response: any) => {
      this.producto = new Publicacion();
      this.subirImagen(response.body._id, 'productos');
      Swal.fire('Producto Ingresado', 'Los moderadores revisaran su producto y lo pondran publico en las proximas horas', 'success');
    });
  }

  getPublicacionesPerfil() {
    this._publicacionService.getPublicacionesPerfil(this.perfil._id).subscribe(response => {
      this.productos = response.publicaciones;
    });
  }

  getPerfilIdUsuario() {
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
      this.getPublicacionesPerfil();
    });
  }

  seleccionImagen(archivo: File) {

      if (!archivo) {
        this.imagenSubir = null;
        return;
      }

      this.imagenSubir = archivo;

  }

  subirImagen(idProducto: string, tipo: string) {
    this._uploadService.subirArchivo(this.imagenSubir, tipo, idProducto)
      .then(resp => {
        this.getPublicacionesPerfil();
      })
      .catch(err => {
        console.log('error en la carga');
      })
  }

}
