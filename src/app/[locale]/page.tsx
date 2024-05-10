import dynamic from "next/dynamic";
const Footer = dynamic(() => import("./components/footer"));
import Section1 from "./components/section1";
const Section4 = dynamic(() => import("./components/section4"));
const Section3 = dynamic(() => import("./components/section3"));
const Section2 = dynamic(() => import("./components/section2"), {
  loading: () => <div className="h-screen" />,
});

import { getCurrentLocale } from "@/locale/server";
import { env } from "@/env";

export default async function Home() {
  const locale = getCurrentLocale();

  const url = `${env.API_URL}/api/pages?locale=${locale}`;

  console.log(url);

  const data = await fetch(url);

  if (!data.ok) {
    return null;
  }

  const response = await data.json();

  const page: Record<string, any> = response.docs[0];

  return (
    <main className="relative">
      <Section1 data={page.hero} />
      <Section2 data={page.services} />
      <Section3 data={page.showcase} />
      <Section4 data={page.contact} />
      <Footer />
    </main>
  );
}
