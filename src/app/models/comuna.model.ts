import { Region } from './region.model';

export class Comuna{

    constructor(
        public _id?: string,
        public nombre?: string,
        public region?: Region
    ){}

}