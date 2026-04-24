import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({ tableName: "home_content", schema: "casa-church", timestamps: true })
export class HomeContent extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(120), allowNull: false })
  declare heroTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare heroSubtitle: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare heroImageUrl: string | null;

  @Column({ type: DataType.STRING(120), allowNull: false })
  declare aboutTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare aboutDescription: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare aboutImageUrl: string | null;

  @Column({ type: DataType.STRING(60), allowNull: false })
  declare aboutButtonText: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare aboutButtonLink: string;

  @Column({ type: DataType.STRING(120), allowNull: false })
  declare eventsTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare eventsDescription: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare eventsImageUrl: string | null;

  @Column({ type: DataType.STRING(60), allowNull: false })
  declare eventsButtonText: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare eventsButtonLink: string;

  @Column({ type: DataType.STRING(120), allowNull: false })
  declare ciTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare ciDescription: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare ciImageUrl: string | null;

  @Column({ type: DataType.STRING(60), allowNull: false })
  declare ciButtonText: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare ciButtonLink: string;

  @Default("Você é bem vindo a casa!")
  @Column({ type: DataType.STRING(160), allowNull: false })
  declare footerWelcomePhrase: string;

  @Default("Domingos, 10h e 19h")
  @Column({ type: DataType.STRING(220), allowNull: false })
  declare footerServiceDays: string;

  @Default("Endereço da Casa Church")
  @Column({ type: DataType.TEXT, allowNull: false })
  declare footerAddress: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
