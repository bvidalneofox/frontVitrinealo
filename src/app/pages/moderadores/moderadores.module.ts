import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeradoresRoutingModule } from './moderadores-routing.module';
import { InicioModeracionComponent } from './inicio-moderacion/inicio-moderacion.component';
import { SolicitudesPerfilComponent } from './solicitudes-perfil/solicitudes-perfil.component';
import { SolicitudesProductosComponent } from './solicitudes-productos/solicitudes-productos.component';
import { LogErroresComponent } from './log-errores/log-errores.component';
import { FormsModule } from '@angular/forms';
import { SolicitudesDestacadosComponent } from './solicitudes-destacados/solicitudes-destacados.component';


@NgModule({
  declarations: [
    InicioModeracionComponent,
    SolicitudesPerfilComponent,
    SolicitudesProductosComponent,
    LogErroresComponent,
    SolicitudesDestacadosComponent
  ],
  imports: [
    CommonModule,
    ModeradoresRoutingModule,
    FormsModule
  ]
})
export class ModeradoresModule { }
