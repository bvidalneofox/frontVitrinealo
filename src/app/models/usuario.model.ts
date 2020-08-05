import { Comuna } from './comuna.model';

export class Usuario{

    constructor(
        public _id?: string,
        public nombre?: string,
        public correo?: string,
        public password?: string,
        public facebook?: boolean,
        public google?: boolean,
        public blocked?: boolean,
        public ciudad?: Comuna
    ){}

}