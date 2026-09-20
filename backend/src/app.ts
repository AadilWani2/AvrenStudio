import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import inquiryRoutes from "./routes/inquiryRoutes.js";

const app = express();

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "https://avren-studio.vercel.app",
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

import { sendInquiryEmail } from "./services/emailService.js";

app.use("/api/inquiries", inquiryRoutes);

app.get("/api/health", (_req, res) => {
  const mailTo =
    process.env.MAIL_TO ||
    process.env.MAIL_USER ||
    "waniaadil211@gmail.com";

  res.status(200).json({
    success: true,
    message: "Nexora API is running",
    environment: process.env.NODE_ENV || "production",
    emailProviders: {
      resendHttp: Boolean(process.env.RESEND_API_KEY),
      brevoHttp: Boolean(process.env.BREVO_API_KEY),
      gmailSmtp: Boolean(process.env.MAIL_USER && process.env.MAIL_APP_PASSWORD),
    },
    targetRecipient: mailTo,
    activeProvider: process.env.RESEND_API_KEY
      ? "resend (HTTP - recommended for Render)"
      : process.env.BREVO_API_KEY
      ? "brevo (HTTP - recommended for Render)"
      : process.env.MAIL_USER
      ? "smtp (Gmail - note: Render free tier blocks outbound SMTP ports)"
      : "none configured",
  });
});

app.post("/api/health/test-email", async (_req, res) => {
  try {
    const result = await sendInquiryEmail({
      name: "Nexora Diagnostic Bot",
      email: "diagnostics@avrenstudio.dev",
      projectType: "Email System Test",
      budget: "Internal Test",
      message: "This is an automated test from the Nexora API to verify that incoming inquiry emails arrive in your Gmail inbox properly.",
    });

    res.status(200).json({
      success: true,
      message: `Test email sent successfully via ${result.method}! Check ${result.recipient}.`,
      delivery: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Test email dispatch failed.",
      error: error.message,
    });
  }
});

export default app;