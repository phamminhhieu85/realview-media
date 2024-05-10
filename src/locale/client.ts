import { createI18nClient } from "next-international/client";

export const { useCurrentLocale, useChangeLocale, I18nProviderClient } =
  createI18nClient({
    en: () => import("./emp"),
    vn: () => import("./emp"),
  });
