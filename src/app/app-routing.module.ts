import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicMasterComponent } from './pages/public/public-master.component';
import { InicioComponent } from './pages/public/inicio/inicio.component';
import { CatalogoComponent } from './pages/public/catalogo/catalogo.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';
import { RegistroComponent } from './pages/public/registro/registro.component';
import { AdministradorPerfilComponent } from './pages/auth/administrador-perfil/administrador-perfil.component';


const routes: Routes = [
  {
    path: '', component: PublicMasterComponent, children:
      [
        { path: '', component: InicioComponent },
        { path: 'catalogo', component: CatalogoComponent },
        { path: 'perfil/:id', component: PerfilComponent },
        { path: 'registro', component: RegistroComponent }
      ]
  },
  {
    path: 'miPerfil', component: PublicMasterComponent, children:
      [
        { path: '', component: AdministradorPerfilComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
