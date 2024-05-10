import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SENDGRID_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    EMAIL_TO_EN: z.string().min(1),
    EMAIL_TO_VN: z.string().min(1),
    API_URL: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
});
