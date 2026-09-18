import type { Request, Response } from "express";
import { inquirySchema } from "../utils/inquiryValidation.js";
import { createInquiry } from "../services/inquiryService.js";

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

    const inquiry = await createInquiry(result.data);

    res.status(201).json({
      success: true,
      message: "Your inquiry has been received.",
      inquiryId: inquiry._id,
    });
  } catch (error) {
    console.error("Submit inquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}