import { WEDDING_EVENT_TYPES } from "@/types";
import { z } from "zod";

export const loveStorySchema = z.object({
  title: z
    .string()
    .min(1, "Vui lòng nhập tiêu đề")
    .max(100, "Tiêu đề tối đa 100 ký tự"),
  content: z
    .string()
    .min(1, "Vui lòng nhập nội dung")
    .max(1000, "Nội dung tối đa 1000 ký tự"),
  storyDate: z.string().optional(),
  imageUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
});

export type LoveStoryFormData = z.infer<typeof loveStorySchema>;

export const weddingEventSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["ceremony", "reception", "party"]),
  eventDate: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  address: z.string().min(1),
  description: z.string().optional(),
});

export type WeddingEventFormData = z.infer<typeof weddingEventSchema>;
