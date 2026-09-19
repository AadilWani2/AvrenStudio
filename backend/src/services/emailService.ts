import nodemailer from "nodemailer";

interface InquiryEmailData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export async function sendInquiryEmail(
  inquiry: InquiryEmailData
): Promise<void> {
  const mailTo = process.env.MAIL_TO;

  if (!mailTo) {
    throw new Error("MAIL_TO is not defined");
  }

  await transporter.sendMail({
    from: `"Nexora Website" <${process.env.MAIL_USER}>`,
    to: mailTo,
    replyTo: inquiry.email,
    subject: `New Project Inquiry — ${inquiry.name}`,

    text: `
NEXORA — NEW PROJECT INQUIRY

Client
${inquiry.name}

Email
${inquiry.email}

Project Type
${inquiry.projectType}

Estimated Budget
${inquiry.budget}

Project Details
${inquiry.message}
    `.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #111;">
        <div style="padding: 28px 0; border-bottom: 1px solid #ddd;">
          <div style="font-size: 12px; letter-spacing: 3px; color: #777;">
            NEXORA
          </div>

          <h1 style="margin: 12px 0 0; font-size: 30px;">
            New Project Inquiry
          </h1>
        </div>

        <div style="padding: 28px 0;">
          <p style="margin: 0 0 6px; font-size: 11px; color: #888; letter-spacing: 1.5px;">
            CLIENT
          </p>
          <p style="margin: 0; font-size: 18px;">
            ${inquiry.name}
          </p>

          <p style="margin: 24px 0 6px; font-size: 11px; color: #888; letter-spacing: 1.5px;">
            EMAIL
          </p>
          <p style="margin: 0; font-size: 16px;">
            ${inquiry.email}
          </p>

          <p style="margin: 24px 0 6px; font-size: 11px; color: #888; letter-spacing: 1.5px;">
            PROJECT TYPE
          </p>
          <p style="margin: 0; font-size: 16px;">
            ${inquiry.projectType}
          </p>

          <p style="margin: 24px 0 6px; font-size: 11px; color: #888; letter-spacing: 1.5px;">
            ESTIMATED BUDGET
          </p>
          <p style="margin: 0; font-size: 16px;">
            ${inquiry.budget}
          </p>

          <p style="margin: 24px 0 6px; font-size: 11px; color: #888; letter-spacing: 1.5px;">
            PROJECT DETAILS
          </p>

          <div style="padding: 18px; background: #f5f5f5; line-height: 1.7; font-size: 15px;">
            ${inquiry.message.replace(/\n/g, "<br />")}
          </div>
        </div>

        <div style="padding: 20px 0; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
          Submitted through the Nexora website.
        </div>
      </div>
    `,
  });
}