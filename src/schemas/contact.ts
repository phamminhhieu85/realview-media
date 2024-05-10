import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.string().min(1),
  describe: z.string().min(1),
});

export type ContactForm = z.infer<typeof contactSchema>;
