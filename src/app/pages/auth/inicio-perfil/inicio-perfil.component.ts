import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-perfil',
  templateUrl: './inicio-perfil.component.html',
  styleUrls: ['./inicio-perfil.component.css']
})
export class InicioPerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();

  constructor(
    public _loginService: LoginService,
    public _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.getPerfilIdUsuario();
  }


  setPerfil(f: NgForm) {

    if (f.invalid) {
      Swal.fire('Formulario Incompleto', 'Revise que no falten campos obligatorios por completar', 'error');
      return;
    }

    this._perfilService.setPerfil(this.perfil).subscribe((response: any) => {
      Swal.fire('Felicitaciones', '¡Ya ha creado su perfil!', 'success');
      this.getPerfilIdUsuario();
    });
  }

  getPerfilIdUsuario() {
    this._perfilService.getPerfilIdUsuario(this._loginService.usuario._id).subscribe(response => {
      this.perfil = response.perfil;
      this._perfilService.color = response.perfil.color;
    });
  }

}
