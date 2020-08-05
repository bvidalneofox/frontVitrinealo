import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = environment.url + 'img';

    if (!img) {
      return 'assets/images/no-image.jpg';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'perfiles':
        return `${url}/perfiles/${img}`;
        break;

      case 'productos':
        return `${url}/productos/${img}`;
        break;

      default:
        return console.log('tipo de imagen no existe, solo productos, perfiles');
        break;
    }
  }

}
