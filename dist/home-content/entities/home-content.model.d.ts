import { Model } from "sequelize-typescript";
export declare class HomeContent extends Model {
    id: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImageUrl: string | null;
    aboutTitle: string;
    aboutDescription: string;
    aboutImageUrl: string | null;
    aboutButtonText: string;
    aboutButtonLink: string;
    eventsTitle: string;
    eventsDescription: string;
    eventsImageUrl: string | null;
    eventsButtonText: string;
    eventsButtonLink: string;
    ciTitle: string;
    ciDescription: string;
    ciImageUrl: string | null;
    ciButtonText: string;
    ciButtonLink: string;
    footerWelcomePhrase: string;
    footerServiceDays: string;
    footerAddress: string;
    createdAt: Date;
    updatedAt: Date;
}
