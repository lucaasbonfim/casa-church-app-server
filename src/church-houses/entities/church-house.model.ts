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

@Table({ tableName: "church_houses", schema: "casa-church", timestamps: true })
export class ChurchHouse extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string | null;

  @Column({ type: DataType.STRING(120), allowNull: false })
  declare street: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  declare number: string;

  @Column({ type: DataType.STRING(120), allowNull: true })
  declare complement?: string | null;

  @Column({ type: DataType.STRING(80), allowNull: false })
  declare neighborhood: string;

  @Column({ type: DataType.STRING(80), allowNull: false })
  declare city: string;

  @Column({ type: DataType.STRING(80), allowNull: false })
  declare state: string;

  @Column({ type: DataType.STRING(2), allowNull: false })
  declare uf: string;

  @Column({ type: DataType.STRING(12), allowNull: true })
  declare zipCode?: string | null;

  @Column({ type: DataType.STRING(160), allowNull: true })
  declare reference?: string | null;

  @Column({ type: DataType.STRING(30), allowNull: true })
  declare contactPhone?: string | null;

  @Column({ type: DataType.STRING(220), allowNull: true })
  declare meetingSchedule?: string | null;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  declare latitude: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  declare longitude: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
