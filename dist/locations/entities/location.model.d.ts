import { Model } from "sequelize-typescript";
export declare class Location extends Model {
    id: string;
    name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    uf: string;
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
}
