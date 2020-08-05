import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador-perfil.component.html',
  styleUrls: ['./administrador-perfil.component.css']
})
export class AdministradorPerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();
  producto: Publicacion = new Publicacion();
  productos: Publicacion[] = [];

  imagenSubir: File;

  constructor(
    public _perfilService: PerfilService,
    public _publicacionService: PublicacionService,
    public _loginService: LoginService,
    public _uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
  }

  getPerfilIdUsuario(){
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
      this.getPublicacionesPerfil();
    });
  }

  getPublicacionesPerfil(){
    this._publicacionService.getPublicacionesPerfil(this.perfil._id).subscribe(response => {
      this.productos = response.publicaciones;
    });
  }

  updatePerfil(f: NgForm){
    this._perfilService.actualizarPerfil(this.perfil).subscribe(response => {
      console.log(response);
    });
  }

  setPerfil(){
    this._perfilService.setPerfil(this.perfil).subscribe(response => {
      Swal.fire('Felicitaciones', '¡Ya ha creado su perfil!', 'success');
      this.getPerfilIdUsuario();
    });
  }

  setProducto(f: NgForm){

    if(f.invalid){
      Swal.fire('Formulario Incompleto','Revise que no falten campos obligatorios por completar','error');
      return;
    }

    let idPerfil: any = this.perfil._id;
    this.producto.perfil = idPerfil;

    this._publicacionService.setPublicacion(this.producto).subscribe((response: any) => {
      this.producto = new Publicacion();
      this.subirImagen(response.body._id);
      Swal.fire('Producto Ingresado', 'Los moderadores revisaran su producto y lo pondran publico en las proximas horas', 'success');
    });
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

  }

  subirImagen(idProducto: string){
    this._uploadService.subirArchivo(this.imagenSubir, 'productos', idProducto)
      .then(resp => {
        // alert('Imagen subida correctamente');
        this.getPublicacionesPerfil();
      })
      .catch(err => {
        // console.log('error en la carga');
      })
  }

}
