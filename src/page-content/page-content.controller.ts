import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";
import { UpdatePageContentDto } from "./dto/update-page-content.dto";
import { PageContentService } from "./page-content.service";

@UseInterceptors(UserActivityInterceptor)
@Controller("page-content")
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @ApiOperation({ summary: "Buscar conteudo de uma pagina publica" })
  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.pageContentService.findBySlug(slug);
  }

  @ApiOperation({ summary: "Atualizar conteudo de uma pagina publica" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Patch(":slug")
  update(
    @Param("slug") slug: string,
    @Body() updatePageContentDto: UpdatePageContentDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.pageContentService.update(
      slug,
      updatePageContentDto,
      tokenPayload,
    );
  }
}
