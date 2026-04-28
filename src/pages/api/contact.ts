import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { name, email, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    const response = await resend.emails.send({
      from: "Cenote Adventuring <onboarding@resend.dev>", // luego cambias a tu dominio
      to: ["info@cenoteadventuring.com"],
      subject: `Nuevo mensaje de ${name}`,
      reply_to: email,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error sending email" }),
      { status: 500 }
    );
  }
};