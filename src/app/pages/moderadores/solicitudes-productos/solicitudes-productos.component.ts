import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-solicitudes-productos',
  templateUrl: './solicitudes-productos.component.html',
  styleUrls: ['./solicitudes-productos.component.css']
})
export class SolicitudesProductosComponent implements OnInit {


  productos: Publicacion[] = [];

  notificacion: Notificacion = new Notificacion();

  modoEdicion: boolean = false;

  constructor(
    public _publicacionService: PublicacionService,
    public _notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(){
    this._publicacionService.getPublicaciones().subscribe(response => {
        this.productos = response.publicaciones;
    });
  }

  testSi(producto: Publicacion){
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
        producto.publico = true;
        producto.estado = 'A';
        this._publicacionService.actualizarPublicacion(producto).subscribe(response => {
          Swal.fire('¡Aprobado!','El perfil ahora será publico.','success');
        });
      }
    })
  }

  testNo(producto: Publicacion){
    Swal.fire({
      title: '¿Esta Seguro?',
      text: "Ingrese el motivo por el cual será rechazado",
      icon: 'warning',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, rechazar!'
    }).then((result) => {
      if (result.value) {
        producto.estado = 'R';
        let mensaje: any = result.value;
        producto.mensaje = mensaje;
        this._publicacionService.actualizarPublicacion(producto).subscribe(response => {
          this.setNotificacion(mensaje, producto.perfil.usuario);
          Swal.fire('¡Rechazado!','Se le informará al usuario el motivo por el cual se ha rechazado su producto.','success');
        });
      }
    })
  }

  actualizarProducto(producto: Publicacion){
    this._publicacionService.actualizarPublicacion(producto).subscribe(response => {
      console.log(response);
    });
  }

  setNotificacion(mensaje: string, usuario: any){
    this.notificacion.mensaje = mensaje;
    this.notificacion.usuario = usuario;
    this._notificacionService.setNotificacion(this.notificacion).subscribe(response => {
      console.log(response);
    });
  }

}
