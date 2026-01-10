import { Wedding, WeddingLanguage } from "./wedding";
import { BrideGroomInput } from "./graphql";

export interface ThemeSettingsInput {
  primaryColor?: string;
  secondaryColor?: string;
  fontHeading?: string;
  fontBody?: string;
  backgroundMusic?: string;
  template?: string;
}

export interface CreateWeddingInput {
  title: string;
  slug?: string;
  language?: string;
  weddingDate: string;
  bride: BrideGroomInput;
  groom: BrideGroomInput;
  themeSettings?: ThemeSettingsInput;
}

export interface CreateWeddingResponse {
  createWedding: Wedding;
}

export interface IThemeSettingInput {
  primaryColor?: string;
  secondaryColor?: string;
  fontHeading?: string;
  fontBody?: string;
  backgroundMusic?: string;
}
export interface IBrideGroomInput {
  fullName: string;
  avatar?: string;
  shortBio?: string;
  familyInfo?: string;
  socialLinks?: JSON;
}
