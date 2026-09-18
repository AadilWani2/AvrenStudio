import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email is too long"),

  projectType: z
    .string()
    .trim()
    .min(1, "Project type is required")
    .max(100, "Project type is too long"),

  budget: z
    .string()
    .trim()
    .min(1, "Budget is required")
    .max(100, "Budget is too long"),

  message: z
    .string()
    .trim()
    .min(10, "Please provide more details about your project")
    .max(5000, "Message is too long"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;