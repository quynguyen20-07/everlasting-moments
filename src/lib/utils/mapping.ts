import { Wedding } from "@/types";

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

    stories:
      detail?.loveStories && detail.loveStories.length > 0
        ? detail.loveStories
        : [],

    events: detail?.weddingEvents ?? [],

    wishes: [],
    bankInfo: null,
  };
};
