import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioModeracionComponent } from './inicio-moderacion/inicio-moderacion.component';
import { SolicitudesPerfilComponent } from './solicitudes-perfil/solicitudes-perfil.component';
import { SolicitudesProductosComponent } from './solicitudes-productos/solicitudes-productos.component';
import { LogErroresComponent } from './log-errores/log-errores.component';


const routes: Routes = [
  { path: 'inicio', component: InicioModeracionComponent },
  { path: 'solicitudesPerfil', component: SolicitudesPerfilComponent },
  { path: 'solicitudesProductos', component: SolicitudesProductosComponent },
  { path: 'logErrores', component: LogErroresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeradoresRoutingModule { }
