import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ChurchHousesService } from "./church-houses.service";
import { CreateChurchHouseDto } from "./dto/create-church-house.dto";
import { FindChurchHousesQueryDto } from "./dto/find-church-houses-query.dto";
import { UpdateChurchHouseDto } from "./dto/update-church-house.dto";
export declare class ChurchHousesController {
    private readonly churchHousesService;
    constructor(churchHousesService: ChurchHousesService);
    create(createChurchHouseDto: CreateChurchHouseDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        churchHouse: import("./entities/church-house.model").ChurchHouse;
    }>;
    findAll(findQuery: FindChurchHousesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        churchHouses: import("./entities/church-house.model").ChurchHouse[];
    }>;
    findOne(id: string): Promise<import("./entities/church-house.model").ChurchHouse>;
    update(id: string, updateChurchHouseDto: UpdateChurchHouseDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        churchHouse: import("./entities/church-house.model").ChurchHouse;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
