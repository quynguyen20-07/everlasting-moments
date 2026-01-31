export * from "./api.generated";
import { Wedding, ThemeSettings, Bride, Groom } from "./api.generated";

export interface WeddingWithDetails extends Wedding {
    themeSettings?: ThemeSettings;
    weddingDetail?: {
        bride?: Bride;
        groom?: Groom;
    };
}

export * from "./invitation";
export * from "./wedding";
export type { MediaInput, GalleryLayout, GallerySettings } from "./media";
