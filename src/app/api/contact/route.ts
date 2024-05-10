import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import sendgrid from "@sendgrid/mail";

import { render } from "@react-email/render";
import { Contact } from "@/components/emails/contact";
import { ContactForm } from "@/schemas/contact";

sendgrid.setApiKey(env.SENDGRID_API_KEY);

export async function POST(req: NextRequest) {
  const { locale, ...form } = (await req.json()) as ContactForm & {
    locale: string;
  };

  const emailHtml = render(Contact({ form: form }));

  const msg: sendgrid.MailDataRequired = {
    to: locale === "en" ? env.EMAIL_TO_EN : env.EMAIL_TO_VN,
    from: "contact@rvmedia.vn",
    subject: "New contact for Realview Media",
    html: emailHtml,
  };

  try {
    await sendgrid.send(msg);
  } catch (e) {
    console.log("Error on sending email", e);
    return new NextResponse("Failed", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}
