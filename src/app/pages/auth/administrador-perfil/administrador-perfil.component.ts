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

  imagenSubirPerfil: File;

  constructor(
    public _perfilService: PerfilService,
    public _publicacionService: PublicacionService,
    public _loginService: LoginService,
    public _uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
  }

  updatePerfil(f: NgForm) {

    if (f.invalid) {
      Swal.fire('Formulario Incompleto', 'Revise que no falten campos obligatorios por completar', 'error');
      return;
    }

    this._perfilService.actualizarPerfil(this.perfil).subscribe((response: any) => {
      this.subirImagen(response.body._id, 'perfiles');
      Swal.fire('Perfil Actualizado','Su perfil se ha a ctualizado correctamente, los cambios se veran reflejados una vez que sean aprobados por los moderadores','success');
    });
  }

  getPerfilIdUsuario() {
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
    });
  }

  seleccionImagen(archivo: File) {

    if (archivo.size > 5245329) {
      Swal.fire('Imagen no compatible','La imagen es superior a 5mb, pruebe con una imagen de inferior peso','error');
      return;
    }

      if (!archivo) {
        this.imagenSubirPerfil = null;
        return;
      }

      this.imagenSubirPerfil = archivo;

  }

  subirImagen(idProducto: string, tipo: string) {
    this._uploadService.subirArchivo(this.imagenSubirPerfil, tipo, idProducto)
      .then(resp => {
      })
      .catch(err => {
        console.log('error en la carga');
      })
  }

}
