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
import { CreateDevotionalDto } from "./dto/create-devotional.dto";
import { FindDevotionalsQueryDto } from "./dto/find-devotionals-query.dto";
import { UpdateDevotionalDto } from "./dto/update-devotional.dto";
import { DevotionalsService } from "./devotionals.service";

@UseInterceptors(UserActivityInterceptor)
@Controller("devotionals")
export class DevotionalsController {
  constructor(private readonly devotionalsService: DevotionalsService) {}

  @ApiOperation({ summary: "Cadastrar devocional" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Post()
  create(
    @Body() createDevotionalDto: CreateDevotionalDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.devotionalsService.create(createDevotionalDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar devocionais" })
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() findQuery: FindDevotionalsQueryDto) {
    return this.devotionalsService.findAll(findQuery);
  }

  @ApiOperation({ summary: "Buscar devocional por id" })
  @UseInterceptors(CacheInterceptor)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.devotionalsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar devocional" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDevotionalDto: UpdateDevotionalDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.devotionalsService.update(
      id,
      updateDevotionalDto,
      tokenPayload
    );
  }

  @ApiOperation({ summary: "Remover devocional" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.devotionalsService.remove(id, tokenPayload);
  }
}
