import { ThemeEnum } from "../enums/theme.enum";

export interface Settings {
  fiatCurrency: string;
  language: string;
  themeId: ThemeEnum;
}