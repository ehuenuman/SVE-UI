export class Structure {
<<<<<<< HEAD
    name: string;
    latitude: string;
    longitude: string;
    length: number;
    width: number;
    route: string;
    km: number;
    date_joined: Date;
    photo: string;
    commentary: string;
=======
    constructor(
        public id: number,
        public name: string = "",
        public create_date: Date, 
        public commentary: string = "",
        public latitude: number = 0,
        public longitude: number = 0
    ) {
        
    }
>>>>>>> 4c720e7b9ad9fb4979c430449e615d870b63781e
}