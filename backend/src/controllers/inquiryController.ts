import type { Request, Response } from "express";
import { inquirySchema } from "../utils/inquiryValidation.js";
import { createInquiry } from "../services/inquiryService.js";
import { Inquiry } from "../models/Inquiry.js";

export async function submitInquiry(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = inquirySchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Please check the form fields.",
        errors: result.error.flatten().fieldErrors,
      });

      return;
    }

    const { inquiry, emailSent, emailError } = await createInquiry(result.data);

    res.status(201).json({
      success: true,
      message: "Your inquiry has been received.",
      inquiryId: inquiry._id,
      emailSent,
      ...(emailError ? { emailWarning: emailError } : {}),
    });
  } catch (error) {
    console.error("Submit inquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

export async function getInquiries(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(50);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error: any) {
    console.error("Get inquiries error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load inquiries.",
      error: error.message,
    });
  }
}