import { Usuario } from './usuario.model';

export class Perfil{

    constructor(
        public _id?: string,
        public nombre?: string,
        public descripcion?: string,
        public facebookUrl?: string,
        public twitterUrl?: string,
        public instagramUrl?: string,
        public webUrl?: string,
        public contacto?: string,
        public color?: string,
        public bannerUrl?: string,
        public publico?: boolean,
        public usuario?: Usuario
    ){}

}