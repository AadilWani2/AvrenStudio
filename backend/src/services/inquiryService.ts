import { Inquiry } from "../models/Inquiry.js";
import type { InquiryInput } from "../utils/inquiryValidation.js";
import { sendInquiryEmail } from "./emailService.js";

export async function createInquiry(data: InquiryInput) {
  // Fire email immediately in background so it transmits concurrently with DB save
  sendInquiryEmail({
    name: data.name,
    email: data.email,
    projectType: data.projectType,
    budget: data.budget,
    message: data.message,
  }).catch((error) => {
    console.error("Inquiry email failed in background:", error);
  });

  const inquiry = await Inquiry.create({
    name: data.name,
    email: data.email,
    projectType: data.projectType,
    budget: data.budget,
    message: data.message,
  });

  return inquiry;
}