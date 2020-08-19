import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/models/perfil.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-perfil',
  templateUrl: './solicitudes-perfil.component.html',
  styleUrls: ['./solicitudes-perfil.component.css']
})
export class SolicitudesPerfilComponent implements OnInit {

  perfiles: Perfil[] = [];

  modoEdicion: boolean = false;

  constructor(
    private _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.getPerfiles();
  }

  getPerfiles() {
    this._perfilService.getPerfiles().subscribe(response => {
      this.perfiles = response.perfiles;
    });
  }

  testSi(perfil: Perfil) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: "Esta decisión no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, aceptar!'
    }).then((result) => {
      if (result.value) {
        perfil.publico = true;
        this._perfilService.actualizarPerfil(perfil).subscribe(response => {
          console.log(response);
        });
        Swal.fire(
          '¡Aprobado!',
          'El perfil ahora será publico.',
          'success'
        )
      }
    })
  }

  testNo(perfil: Perfil) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: "Esta decisión no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, rechazar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Rechazado!',
          'Se le informará al usuario el motivo por el cual se ha rechazado su perfil.',
          'success'
        )
      }
    })
  }

  actualizarPerfil(perfil: Perfil){
    this._perfilService.actualizarPerfil(perfil).subscribe(response => {
      Swal.fire('¡Actualizado!','Se ha actualizado la información correspondiente.','success')
    });
  }

}
