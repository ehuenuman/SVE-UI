export class Structure {
    constructor(
        public id: number,
        public name: string = "",
        public create_date: Date, 
        public commentary: string = "",
        public latitude: number = 0,
        public longitude: number = 0
    ) {
        
    }
}