import nodemailer from "nodemailer";

interface InquiryEmailData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export type EmailDeliveryMethod = "resend" | "brevo" | "smtp";

export interface EmailDeliveryResult {
  method: EmailDeliveryMethod;
  messageId?: string;
  recipient: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  pool: true,
  maxConnections: 2,
  maxMessages: 50,
  connectionTimeout: 5000,
  greetingTimeout: 4000,
  socketTimeout: 8000,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export function verifyEmailTransporter(): void {
  if (process.env.RESEND_API_KEY) {
    console.log("[Email Service] Resend HTTP API configured (Render port 443 compatible).");
    return;
  }

  if (process.env.BREVO_API_KEY) {
    console.log("[Email Service] Brevo HTTP API configured (Render port 443 compatible).");
    return;
  }

  if (process.env.MAIL_USER && process.env.MAIL_APP_PASSWORD) {
    transporter.verify((error) => {
      if (error) {
        console.warn(
          "[Email Service] SMTP Warning (Note: Render Free Tier blocks outbound SMTP ports 465/587):",
          error.message
        );
      } else {
        console.log("[Email Service] Local SMTP connection verified and warm.");
      }
    });
  } else {
    console.warn(
      "[Email Service] Warning: No email credentials found (RESEND_API_KEY or MAIL_USER/MAIL_APP_PASSWORD)."
    );
  }
}

export async function sendInquiryEmail(
  inquiry: InquiryEmailData
): Promise<EmailDeliveryResult> {
  const mailTo =
    process.env.MAIL_TO ||
    process.env.MAIL_USER ||
    "waniaadil211@gmail.com";

  const textContent = `
AVRENSTUDIO / NEXORA — NEW PROJECT INQUIRY

Client Name: ${inquiry.name}
Client Email: ${inquiry.email}
Project Type: ${inquiry.projectType}
Estimated Budget: ${inquiry.budget}

Project Details:
${inquiry.message}
  `.trim();

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #111; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #0d0e12; padding: 28px 32px; color: #ffffff;">
        <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #cbff4d; font-weight: 600;">AVRENSTUDIO // NEXORA</div>
        <h1 style="margin: 12px 0 0; font-size: 24px; font-weight: 600; letter-spacing: -0.02em;">New Project Inquiry</h1>
      </div>

      <div style="padding: 32px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div>
            <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600;">Client</p>
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${inquiry.name}</p>
          </div>
          <div>
            <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600;">Email</p>
            <p style="margin: 0; font-size: 16px;"><a href="mailto:${inquiry.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${inquiry.email}</a></p>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600;">Project Type</p>
          <p style="margin: 0; font-size: 15px; color: #111827; font-weight: 500;">${inquiry.projectType}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600;">Estimated Budget</p>
          <p style="margin: 0; font-size: 15px; color: #111827; font-weight: 500;">${inquiry.budget}</p>
        </div>

        <div>
          <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600;">Project Details</p>
          <div style="padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; line-height: 1.6; font-size: 14px; color: #374151; white-space: pre-wrap;">${inquiry.message}</div>
        </div>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
          Direct reply to client: click "Reply" or email <a href="mailto:${inquiry.email}">${inquiry.email}</a>.
        </div>
      </div>
    </div>
  `;

  // 1. Resend HTTP API (Primary & Recommended for Render / Cloud deployments)
  if (process.env.RESEND_API_KEY) {
    const resendFrom =
      process.env.RESEND_FROM || "Nexora Studio <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [mailTo],
        reply_to: inquiry.email,
        subject: `New Project Inquiry — ${inquiry.name} (${inquiry.projectType})`,
        text: textContent,
        html: htmlContent,
      }),
    });

    const data: any = await res.json();

    if (!res.ok) {
      throw new Error(
        `Resend API error (${res.status}): ${data.message || JSON.stringify(data)}`
      );
    }

    console.log(
      `[Email] Successfully dispatched via Resend HTTP API to ${mailTo} (ID: ${data.id})`
    );
    return { method: "resend", messageId: data.id, recipient: mailTo };
  }

  // 2. Brevo HTTP API (Secondary HTTP option over HTTPS port 443)
  if (process.env.BREVO_API_KEY) {
    const brevoFrom = process.env.BREVO_FROM || mailTo;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Nexora Studio", email: brevoFrom },
        to: [{ email: mailTo }],
        replyTo: { email: inquiry.email, name: inquiry.name },
        subject: `New Project Inquiry — ${inquiry.name} (${inquiry.projectType})`,
        htmlContent: htmlContent,
        textContent: textContent,
      }),
    });

    const data: any = await res.json();

    if (!res.ok) {
      throw new Error(
        `Brevo API error (${res.status}): ${data.message || JSON.stringify(data)}`
      );
    }

    console.log(
      `[Email] Successfully dispatched via Brevo HTTP API to ${mailTo} (ID: ${data.messageId})`
    );
    return { method: "brevo", messageId: data.messageId, recipient: mailTo };
  }

  // 3. Nodemailer SMTP (Works on local dev; blocked on Render Free Tier)
  if (!process.env.MAIL_USER || !process.env.MAIL_APP_PASSWORD) {
    throw new Error(
      "Email delivery configuration missing. Please add RESEND_API_KEY (recommended for Render) or MAIL_USER and MAIL_APP_PASSWORD."
    );
  }

  try {
    const info = await transporter.sendMail({
      from: `"Nexora Website" <${process.env.MAIL_USER}>`,
      to: mailTo,
      replyTo: inquiry.email,
      subject: `New Project Inquiry — ${inquiry.name} (${inquiry.projectType})`,
      text: textContent,
      html: htmlContent,
    });

    console.log(
      `[Email] Successfully dispatched via SMTP to ${mailTo} (ID: ${info.messageId})`
    );
    return { method: "smtp", messageId: info.messageId, recipient: mailTo };
  } catch (err: any) {
    if (
      err.code === "ETIMEDOUT" ||
      err.code === "ECONNREFUSED" ||
      err.message?.toLowerCase().includes("timeout")
    ) {
      throw new Error(
        "SMTP Connection Timed Out. Render Free Tier blocks outbound SMTP ports (25, 465, 587). Please add RESEND_API_KEY to your Render Environment Variables to send emails via HTTP port 443."
      );
    }
    throw err;
  }
}