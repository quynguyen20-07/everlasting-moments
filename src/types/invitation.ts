export type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
};

export type CoupleInfo = {
  name: string;
};

export type CoupleData = {
  bride: CoupleInfo;
  groom: CoupleInfo;
};

export type TemplateInfo = {
  name: string;
};

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type GalleryImage = {
  id: string | number;
  src: string;
  alt: string;
};
