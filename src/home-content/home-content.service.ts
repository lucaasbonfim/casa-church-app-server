import { ForbiddenException, Injectable } from "@nestjs/common";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";
import { UPDATED_HOME_CONTENT_MESSAGE } from "./home-content.constants";
import { HomeContentRepository } from "./home-content.repository";

@Injectable()
export class HomeContentService {
  constructor(private readonly homeContentRepository: HomeContentRepository) {}

  private getDefaultHomeContent() {
    return {
      heroTitle: "Bem-vindo a Casa Church Global",
      heroSubtitle: "Seja muito bem-vindo, esta casa tambem e sua.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1569759276108-31b8e7e43e7b?q=80&w=1200&auto=format&fit=crop",
      aboutTitle: "Sobre nos",
      aboutDescription:
        "Conheca a nossa historia, visao e valores como comunidade.",
      aboutImageUrl:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
      aboutButtonText: "Saiba mais",
      aboutButtonLink: "/sobre",
      eventsTitle: "Proximos eventos",
      eventsDescription:
        "Acompanhe o que vai acontecer na agenda da Casa Church.",
      eventsImageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      eventsButtonText: "Ver agenda",
      eventsButtonLink: "/eventos",
      ciTitle: "Encontre um CI",
      ciDescription:
        "Veja o CI mais proximo de voce e encontre um ponto de comunhao.",
      ciImageUrl:
        "https://images.unsplash.com/photo-1599818539518-c5d59a0e2a08?q=80&w=1200&auto=format&fit=crop",
      ciButtonText: "Ver CIs",
      ciButtonLink: "/cis",
      footerWelcomePhrase: "Você é bem vindo a casa!",
      footerServiceDays: "Domingos, 10h e 19h",
      footerAddress: "Endereço da Casa Church",
    };
  }

  async findCurrent() {
    let homeContent = await this.homeContentRepository.findCurrent();

    if (!homeContent) {
      homeContent = await this.homeContentRepository.create(
        this.getDefaultHomeContent()
      );
    }

    return homeContent;
  }

  async update(
    updateHomeContentDto: UpdateHomeContentDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const homeContent = await this.findCurrent();
    const updatedHomeContent = await this.homeContentRepository.update(
      homeContent.id,
      updateHomeContentDto
    );

    return {
      message: UPDATED_HOME_CONTENT_MESSAGE,
      homeContent: updatedHomeContent,
    };
  }
}
