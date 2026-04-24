import { Model } from "sequelize-typescript";
export declare class ChurchHouse extends Model {
    id: string;
    name: string;
    description?: string | null;
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    uf: string;
    zipCode?: string | null;
    reference?: string | null;
    contactPhone?: string | null;
    meetingSchedule?: string | null;
    latitude: number;
    longitude: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
