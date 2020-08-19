import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicMasterComponent } from './pages/public/public-master.component';
import { InicioComponent } from './pages/public/inicio/inicio.component';
import { CatalogoComponent } from './pages/public/catalogo/catalogo.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';
import { RegistroComponent } from './pages/public/registro/registro.component';
import { AdministradorPerfilComponent } from './pages/auth/administrador-perfil/administrador-perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthMasterComponent } from './pages/auth/auth-master.component';
import { InicioPerfilComponent } from './pages/auth/inicio-perfil/inicio-perfil.component';
import { AdministradorProductosComponent } from './pages/auth/administrador-productos/administrador-productos.component';
import { EstadisticasPerfilComponent } from './pages/auth/estadisticas-perfil/estadisticas-perfil.component';


const routes: Routes = [
  {
    path: '', component: PublicMasterComponent, children:
      [
        { path: '', component: InicioComponent },
        { path: 'catalogo/:id', component: CatalogoComponent },
        { path: 'perfil/:id', component: PerfilComponent },
        { path: 'registro', component: RegistroComponent }
      ]
  },
  {
    path: 'miPerfil', component: AuthMasterComponent, canActivate: [AuthGuard], children:
      [
        { path: 'inicio', component: InicioPerfilComponent },
        { path: 'administracionPerfil', component: AdministradorPerfilComponent },
        { path: 'administracionProductos', component: AdministradorProductosComponent },
        { path: 'estadisticasPerfil', component: EstadisticasPerfilComponent }
      ]
  },
  {
    path: 'moderacion', loadChildren: () => 
      import('./pages/moderadores/moderadores.module').then(m => m.ModeradoresModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
