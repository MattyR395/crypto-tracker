import { ThemeEnum } from "src/shared/enums/theme.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'UserConfig' })
export class Setting {
  @PrimaryColumn()
  userId: string;

  @Column()
  themeId: ThemeEnum;

  @Column()
  fiatCurrency: string;

  @Column()
  language: string;
}
