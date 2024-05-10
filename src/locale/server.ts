import { createI18nServer } from "next-international/server";

export const { getStaticParams, getCurrentLocale } = createI18nServer({
  en: () => import("./emp"),
  vn: () => import("./emp"),
});
