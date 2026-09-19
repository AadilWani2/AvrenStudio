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

  // Send email asynchronously in background so the user gets an instant response
  setImmediate(() => {
    sendInquiryEmail({
      name: inquiry.name,
      email: inquiry.email,
      projectType: inquiry.projectType,
      budget: inquiry.budget,
      message: inquiry.message,
    }).catch((error) => {
      console.error("Inquiry email failed in background:", error);
    });
  });

  return inquiry;
}