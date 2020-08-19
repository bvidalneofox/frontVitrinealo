import { Usuario } from './usuario.model';

export class Notificacion{

    constructor(
        public mensaje?: string,
        public usuario?: Usuario,
        public createdAt?: string
    ){}

}