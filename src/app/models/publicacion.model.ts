import { Perfil } from './perfil.model';

export class Publicacion{

    constructor(
        public _id?: string,
        public titulo?: string,
        public descripcion?: string,
        public precio?: string,
        public foto1Url?: string,
        public foto2Url?: string,
        public foto3Url?: string,
        public publico?: boolean,
        public perfil?: Perfil,
        public createdAt?: string
    ){}

}