"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeContentService = void 0;
const common_1 = require("@nestjs/common");
const messages_constants_1 = require("../common/constants/messages.constants");
const user_constants_1 = require("../users/user.constants");
const home_content_constants_1 = require("./home-content.constants");
const home_content_repository_1 = require("./home-content.repository");
let HomeContentService = class HomeContentService {
    homeContentRepository;
    constructor(homeContentRepository) {
        this.homeContentRepository = homeContentRepository;
    }
    getDefaultHomeContent() {
        return {
            heroTitle: "Bem-vindo a Casa Church Global",
            heroSubtitle: "Seja muito bem-vindo, esta casa tambem e sua.",
            heroImageUrl: "https://images.unsplash.com/photo-1569759276108-31b8e7e43e7b?q=80&w=1200&auto=format&fit=crop",
            aboutTitle: "Sobre nos",
            aboutDescription: "Conheca a nossa historia, visao e valores como comunidade.",
            aboutImageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
            aboutButtonText: "Saiba mais",
            aboutButtonLink: "/sobre",
            eventsTitle: "Proximos eventos",
            eventsDescription: "Acompanhe o que vai acontecer na agenda da Casa Church.",
            eventsImageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
            eventsButtonText: "Ver agenda",
            eventsButtonLink: "/eventos",
            ciTitle: "Encontre um CI",
            ciDescription: "Veja o CI mais proximo de voce e encontre um ponto de comunhao.",
            ciImageUrl: "https://images.unsplash.com/photo-1599818539518-c5d59a0e2a08?q=80&w=1200&auto=format&fit=crop",
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
            homeContent = await this.homeContentRepository.create(this.getDefaultHomeContent());
        }
        return homeContent;
    }
    async update(updateHomeContentDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const homeContent = await this.findCurrent();
        const updatedHomeContent = await this.homeContentRepository.update(homeContent.id, updateHomeContentDto);
        return {
            message: home_content_constants_1.UPDATED_HOME_CONTENT_MESSAGE,
            homeContent: updatedHomeContent,
        };
    }
};
exports.HomeContentService = HomeContentService;
exports.HomeContentService = HomeContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [home_content_repository_1.HomeContentRepository])
], HomeContentService);
//# sourceMappingURL=home-content.service.js.map