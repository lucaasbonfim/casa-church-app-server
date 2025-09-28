import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SermonsService } from "./sermons.service";
import { CreateSermonDto } from "./dto/create-sermon.dto";
import { UpdateSermonDto } from "./dto/update-sermon.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";

@UseGuards(AuthTokenGuard)
@Controller("sermons")
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @Post()
  create(
    @Body() createSermonDto: CreateSermonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.create(createSermonDto, tokenPayload);
  }

  @Get()
  findAll() {
    return this.sermonsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sermonsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSermonDto: UpdateSermonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.update(id, updateSermonDto, tokenPayload);
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.remove(id, tokenPayload);
  }
}
