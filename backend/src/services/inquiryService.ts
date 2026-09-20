import { Inquiry } from "../models/Inquiry.js";
import type { InquiryInput } from "../utils/inquiryValidation.js";
import { sendInquiryEmail } from "./emailService.js";

export async function createInquiry(data: InquiryInput) {
  const inquiry = await Inquiry.create({
    name: data.name,
    email: data.email,
    projectType: data.projectType,
    budget: data.budget,
    message: data.message,
  });

  let emailSent = false;
  let emailError: string | undefined;

  try {
    const result = await sendInquiryEmail({
      name: inquiry.name,
      email: inquiry.email,
      projectType: inquiry.projectType,
      budget: inquiry.budget,
      message: inquiry.message,
    });
    emailSent = true;
    console.log(`[Inquiry] Email dispatched via ${result.method} (ID: ${result.messageId})`);
  } catch (error: any) {
    emailError = error.message;
    console.error("[Inquiry Email Error]:", error.message);
  }

  return { inquiry, emailSent, emailError };
}