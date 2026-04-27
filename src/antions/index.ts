import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { experimental_AstroContainer } from "astro/container";
import AdminMailContact from "@/components/email/AdminMailContact.astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  mailContactUs: defineAction({
    accept: "form",
    input: z.object({
      fullname: z.string(),
      email: z.string().email(),
      phone: z.string(),
      subject: z.string(),
      message: z.string(),
    }),
    handler: async (input) => {
  console.log("🔥 ACTION EJECUTADA", input);

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "backend.extreme@gmail.com",
    subject: "TEST DIRECTO",
    html: "<h1>Correo funcionando</h1>",
  });

  console.log("📨 RESPONSE:", response);

  return response;
}
  }),
};
