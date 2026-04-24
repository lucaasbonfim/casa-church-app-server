import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";
import { HomeContentService } from "./home-content.service";

@UseInterceptors(UserActivityInterceptor)
@Controller("home-content")
export class HomeContentController {
  constructor(private readonly homeContentService: HomeContentService) {}

  @ApiOperation({ summary: "Buscar conteudo da home" })
  @Get()
  findCurrent() {
    return this.homeContentService.findCurrent();
  }

  @ApiOperation({ summary: "Atualizar conteudo da home" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Patch()
  update(
    @Body() updateHomeContentDto: UpdateHomeContentDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.homeContentService.update(updateHomeContentDto, tokenPayload);
  }
}
