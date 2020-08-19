import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input() productos: Publicacion[] = [];
  @Input() color: string = '';
  @Input() administracion: boolean = false;

  editor: boolean = false;

  constructor(
    public _productosService: PublicacionService
  ) { }

  ngOnInit(): void {
  }

  actualizarProducto(producto: Publicacion){
    producto.estado = 'P';
    producto.publico = false;
    this._productosService.actualizarPublicacion(producto).subscribe(response => {
      Swal.fire('¡Actualizado!','Producto/Servicio actualizado correctamente, una vez los moderadores aprueben los cambios volverá a estar publico','success');
      this.editor = false;
    });
  }

}
