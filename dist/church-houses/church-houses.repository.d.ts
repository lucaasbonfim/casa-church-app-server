import { ChurchHouse } from "src/models";
import { FindChurchHousesQueryDto } from "./dto/find-church-houses-query.dto";
import { CreateChurchHouse, UpdateChurchHouse } from "./types/church-house.types";
export declare class ChurchHousesRepository {
    private readonly churchHouseModel;
    constructor(churchHouseModel: typeof ChurchHouse);
    create(data: CreateChurchHouse): Promise<ChurchHouse>;
    findAll(findQuery: FindChurchHousesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        churchHouses: ChurchHouse[];
    }>;
    findById(id: string): Promise<ChurchHouse | null>;
    update(id: string, data: UpdateChurchHouse): Promise<ChurchHouse>;
    delete(id: string): Promise<void>;
}
