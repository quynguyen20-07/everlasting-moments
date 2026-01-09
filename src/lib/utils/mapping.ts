import { LoveStory, Wedding, WeddingEvent } from "@/types";

export const mapWeddingToCoupleData = (wedding?: Wedding | null) => {
  if (!wedding) return null;

  const detail = wedding.weddingDetail;

  return {
    bride: {
      name: detail?.bride?.fullName?.split(" ").slice(-1).join(" ") || "",
      fullName: detail?.bride?.fullName || "",
    },

    groom: {
      name: detail?.groom?.fullName?.split(" ").slice(-1).join(" ") || "",
      fullName: detail?.groom?.fullName || "",
    },

    weddingDate: wedding.weddingDate
      ? new Date(Number(wedding.weddingDate))
      : null,

    story:
      detail?.loveStories && detail.loveStories.length > 0
        ? detail.loveStories.map((s: LoveStory) => s.content).join("\n\n")
        : "",

    events: detail?.weddingEvents ?? [],

    wishes: [],
    bankInfo: null,
  };
};
