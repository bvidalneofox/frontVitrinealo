import { Usuario } from './usuario.model';

export class Notificacion{

    constructor(
        public _id?: string,
        public mensaje?: string,
        public usuario?: Usuario,
        public revisado?: boolean,
        public createdAt?: string
    ){}

}