import { PartialType } from "@nestjs/swagger";
import { CreateChurchHouseDto } from "./create-church-house.dto";

export class UpdateChurchHouseDto extends PartialType(CreateChurchHouseDto) {}
