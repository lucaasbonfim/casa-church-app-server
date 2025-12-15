import { Model } from "sequelize-typescript";
import { Location } from "src/models";
export declare class Event extends Model {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    location: Location;
    image: string;
}
