import { PartialType } from "@nestjs/mapped-types";
import { CreateDevotionalDto } from "./create-devotional.dto";

export class UpdateDevotionalDto extends PartialType(CreateDevotionalDto) {}
