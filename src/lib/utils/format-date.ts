import { DATE_FORMAT } from "@/constants";
import { Lunar } from "lunar-javascript";
import { vi } from "date-fns/locale";
import { Countdown } from "@/types";
import { format } from "date-fns";

export function formatDateVN(
  date?: number | string | null,
  fallback = "Chưa đặt ngày"
): string {
  if (!date) return fallback;

  // Handle both timestamp numbers and ISO date strings
  const parsedDate = typeof date === "string"
    ? new Date(date)
    : new Date(date);

  // Check if date is valid
  if (isNaN(parsedDate.getTime())) return fallback;

  return parsedDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type DateInput = Date | string | number;

export function formatDateStr(
  date: DateInput,
  formatKey: keyof typeof DATE_FORMAT = "DD_VI_MONTH_YYYY"
): string {
  if (!date) return "";

  const parsedDate =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  return format(parsedDate, DATE_FORMAT[formatKey], {
    locale: vi,
  });
}

export function formatDateFromTimestamp(
  timestamp: string | number,
  formatKey: keyof typeof DATE_FORMAT = "DD_VI_MONTH_YYYY"
): string {
  if (!timestamp) return "";

  const ms = typeof timestamp === "string" ? Number(timestamp) : timestamp;

  if (Number.isNaN(ms)) return "";

  return format(new Date(ms), DATE_FORMAT[formatKey], {
    locale: vi,
  });
}

const THIEN_CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];
const DIA_CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

const GAN_MAP: Record<string, number> = {
  甲: 0,
  乙: 1,
  丙: 2,
  丁: 3,
  戊: 4,
  己: 5,
  庚: 6,
  辛: 7,
  壬: 8,
  癸: 9,
};

const ZHI_MAP: Record<string, number> = {
  子: 0,
  丑: 1,
  寅: 2,
  卯: 3,
  辰: 4,
  巳: 5,
  午: 6,
  未: 7,
  申: 8,
  酉: 9,
  戌: 10,
  亥: 11,
};

export function formatLunarVietnamese(date: Date | string): string {
  const dt = typeof date === "string" ? new Date(date) : date;

  const lunar = Lunar.fromDate(dt);

  const day = lunar.getDay();
  const month = lunar.getMonth();

  const yearGanZhi = lunar.getYearInGanZhi(); // e.g. "乙巳"
  const canChar = yearGanZhi[0]; // "乙"
  const chiChar = yearGanZhi[1]; // "巳"

  const canVN = THIEN_CAN[GAN_MAP[canChar]];
  const chiVN = DIA_CHI[ZHI_MAP[chiChar]];

  return `${day} Tháng ${month} Năm ${canVN} ${chiVN}`;
}

export const getWeddingCountdown = (
  weddingDate: string | number | Date
): Countdown => {
  const target =
    weddingDate instanceof Date
      ? weddingDate.getTime()
      : typeof weddingDate === "string"
        ? Number(weddingDate)
        : weddingDate;

  const now = Date.now();
  const diff = target - now;

  if (diff <= 0 || Number.isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};
