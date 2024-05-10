import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Globe, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCurrentLocale, useChangeLocale } from "@/locale/client";
import { Icons } from "@/components/ui/icons";

export default function Menu() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="rounded-full size-8 bg-white grid place-items-center sm:hidden">
            <MenuIcon size={20} />
          </div>
        </SheetTrigger>
        <SheetContent side="top" className="rounded-b-lg">
          <MenuContent />
        </SheetContent>
      </Sheet>
      <div className="hidden sm:flex sm:gap-2 items-center">
        <MenuContent />
      </div>
    </>
  );
}

const MenuContent = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <div className="flex gap-2 items-center justify-center">
      <Select
        value={locale}
        onValueChange={(value) => changeLocale(value as "vn" | "en")}
      >
        <SelectTrigger className="h-[35px] rounded-full w-fit gap-2">
          <Globe strokeWidth={1.5} size={18} className="text-black" />
          <SelectValue className="hidden sm:block" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="vn">Tiếng Việt</SelectItem>
        </SelectContent>
      </Select>

      <Link
        target="_blank"
        href="https://www.facebook.com/profile.php?id=61557394537326"
        rel="noreferrer"
      >
        <Icons.facebook size={40} />
      </Link>

      <Link
        target="_blank"
        rel="noreferrer"
        href="https://www.instagram.com/realviewmedia_vn/"
      >
        <Icons.instagram size={40} />
      </Link>
    </div>
  );
};
