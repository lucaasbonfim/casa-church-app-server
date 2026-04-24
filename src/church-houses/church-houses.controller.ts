import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";
import { ChurchHousesService } from "./church-houses.service";
import { CreateChurchHouseDto } from "./dto/create-church-house.dto";
import { FindChurchHousesQueryDto } from "./dto/find-church-houses-query.dto";
import { UpdateChurchHouseDto } from "./dto/update-church-house.dto";

@UseInterceptors(UserActivityInterceptor)
@Controller("church-houses")
export class ChurchHousesController {
  constructor(private readonly churchHousesService: ChurchHousesService) {}

  @ApiOperation({ summary: "Cadastrar novo CI" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Post()
  create(
    @Body() createChurchHouseDto: CreateChurchHouseDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.churchHousesService.create(createChurchHouseDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar CIs" })
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() findQuery: FindChurchHousesQueryDto) {
    return this.churchHousesService.findAll(findQuery);
  }

  @ApiOperation({ summary: "Buscar CI por id" })
  @UseInterceptors(CacheInterceptor)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.churchHousesService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar CI" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChurchHouseDto: UpdateChurchHouseDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.churchHousesService.update(
      id,
      updateChurchHouseDto,
      tokenPayload
    );
  }

  @ApiOperation({ summary: "Remover CI" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.churchHousesService.remove(id, tokenPayload);
  }
}
