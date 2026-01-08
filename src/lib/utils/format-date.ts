import { DATE_FORMAT } from "@/constants";
import { Lunar } from "lunar-javascript";
import { vi } from "date-fns/locale";
import { format } from "date-fns";

export function formatDateVN(
  date?: number | string | null,
  fallback = "Chưa đặt ngày"
): string {
  if (!date) return fallback;

  const timestamp = typeof date === "string" ? Number(date) : date;
  if (Number.isNaN(timestamp)) return fallback;

  return new Date(timestamp).toLocaleDateString("vi-VN", {
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
