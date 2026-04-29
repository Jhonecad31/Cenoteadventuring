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
            try {
                const container = await experimental_AstroContainer.create();
                const emailAdminHtml = await container.renderToString(AdminMailContact, {
                    props: {
                        fullName: input.fullname,
                        phone: input.phone,
                        email: input.email,
                        subject: input.subject,
                        message: input.message
                    },
                });

                const subjectAdmin = "Mensaje de contacto - Cenote Adventuring";
                const [res1] = await Promise.all([
                    resend.emails.send({
                        from: 'Cenote Adventuring <onboarding@resend.dev>',
                        to: "backend.extreme@gmail.com",
                        subject: subjectAdmin,
                        replyTo: input.email,
                        html: emailAdminHtml,
                    }),
                ]);

                if (res1.error) {
                    console.error("Resend Error:", res1.error);
                    throw new ActionError({
                        code: "BAD_REQUEST",
                        message: "Error al enviar el correo a través de Resend",
                    });
                }

                return { success: true };
            } catch (e: any) {
                console.error("Action Crash:", e);
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: e.message,
                });
            }
        },
    })
};