import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { RegionService } from 'src/app/services/region.service';
import { ComunaService } from 'src/app/services/comuna.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    public _usuarioService: UsuarioService,
    public _regionService: RegionService,
    public _comunaService: ComunaService,
    public route: Router
  ) { }

  ngOnInit(): void {
  }

  setUsuario(form: NgForm) {
    if (form.value.password !== form.value.password2) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
      return;
    }
    this._usuarioService.setUsuario(this.usuario).subscribe(response => {
      Swal.fire('Felicitaciones', 'Seras redirigido a tu nuevo perfil', 'success')
      this.route.navigate(['/miPerfil']);
    });
  }

}
