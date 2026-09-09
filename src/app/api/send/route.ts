import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().trim().min(2, "Full name is invalid!"),
  email: z.string().trim().email({ message: "Email is invalid!" }),
  message: z.string().trim().min(10, "Message is too short!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      success: zodSuccess,
      data: zodData,
    } = Email.safeParse(body);

    if (!zodSuccess) {
      return Response.json({ error: "Validation failed" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendToEmail = process.env.RESEND_TO_EMAIL;

    if (!resendApiKey || !resendToEmail) {
      console.error("Email service is not configured");
      return Response.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const { error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [resendToEmail],
      replyTo: zodData.email,
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return Response.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
