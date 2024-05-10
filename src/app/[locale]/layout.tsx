"use client";

import { I18nProviderClient } from "@/locale/client";
import { domAnimation, LazyMotion } from "framer-motion";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <I18nProviderClient locale={locale}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </I18nProviderClient>
  );
}
