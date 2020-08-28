import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

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
import { LoadingComponent } from './components/loading/loading.component';
import { CardNavigationComponent } from './components/card-navigation/card-navigation.component';
import { InicioPerfilComponent } from './pages/auth/inicio-perfil/inicio-perfil.component';
import { AdministradorProductosComponent } from './pages/auth/administrador-productos/administrador-productos.component';
import { EstadisticasPerfilComponent } from './pages/auth/estadisticas-perfil/estadisticas-perfil.component';
import { TiempoPipe } from './pipes/tiempo.pipe';
import { AdministradorDestacadosComponent } from './pages/auth/administrador-destacados/administrador-destacados.component';

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
    ImagenesPipe,
    LoadingComponent,
    CardNavigationComponent,
    InicioPerfilComponent,
    AdministradorProductosComponent,
    EstadisticasPerfilComponent,
    TiempoPipe,
    AdministradorDestacadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  exports: [
    CardNavigationComponent
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
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('299119784518513'),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
