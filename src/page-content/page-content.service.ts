import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { UpdatePageContentDto } from "./dto/update-page-content.dto";
import { PAGE_CONTENT_DEFAULTS } from "./page-content.defaults";
import { PageContentRepository } from "./page-content.repository";

@Injectable()
export class PageContentService {
  constructor(private readonly pageContentRepository: PageContentRepository) {}

  async findBySlug(slug: string) {
    const defaultContent = PAGE_CONTENT_DEFAULTS[slug];
    if (!defaultContent) {
      throw new NotFoundException("Pagina nao encontrada.");
    }

    let pageContent = await this.pageContentRepository.findBySlug(slug);
    if (!pageContent) {
      pageContent = await this.pageContentRepository.create(
        slug,
        defaultContent,
      );
    }

    return pageContent;
  }

  async update(
    slug: string,
    updatePageContentDto: UpdatePageContentDto,
    tokenPayload: TokenPayloadDto,
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.findBySlug(slug);
    const pageContent = await this.pageContentRepository.update(
      slug,
      updatePageContentDto.content,
    );

    return {
      message: "Conteudo da pagina atualizado com sucesso.",
      pageContent,
    };
  }
}
