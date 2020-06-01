export interface Ofertas{
    id: string;
    name: string;
    description: string;
    salary: string;
    district: string;
    maps:{
        lat:number;
        lng:number;
    }
}