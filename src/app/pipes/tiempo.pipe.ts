import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo'
})
export class TiempoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        return 'Justo Ahora';
      const intervals = {
        'años': 31536000,
        'meses': 2592000,
        'semanas': 604800,
        'dias': 86400,
        'horas': 3600,
        'minutos': 60,
        'segundos': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' atras'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + ' atras'; // plural (2 days ago)
          }
      }
    }
    return value;
  }

}
