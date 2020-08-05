import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/public/inicio/inicio.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { ItemComponent } from './components/item/item.component';
import { RegistroComponent } from './pages/public/registro/registro.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';
import { CatalogoComponent } from './pages/public/catalogo/catalogo.component';
import { PublicMasterComponent } from './pages/public/public-master.component';
import { AuthMasterComponent } from './pages/auth/auth-master.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AdministradorPerfilComponent } from './pages/auth/administrador-perfil/administrador-perfil.component';
import { AuthInterceptorService } from './services/interceptores/auth-interceptor.service';
import { PerfilComponenteComponent } from './components/perfil-componente/perfil-componente.component';
import { ImagenesPipe } from './pipes/imagenes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FiltroComponent,
    ItemComponent,
    RegistroComponent,
    PerfilComponent,
    CatalogoComponent,
    PublicMasterComponent,
    AuthMasterComponent,
    NavbarComponent,
    ProductosComponent,
    AdministradorPerfilComponent,
    PerfilComponenteComponent,
    ImagenesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
