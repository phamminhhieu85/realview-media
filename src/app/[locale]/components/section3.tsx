"use client";

import AnimateInView from "@/components/animation";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  data: {
    header: string;
    title: string;
    description: string;
    googleEmbed: {
      link: string;
    }[];
  };
}

export default function Section3({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <div className="shadow-2xl py-20 rounded-[40px]">
      <div className="container max-w-6xl">
        {/* <div className="h-[60vh] relative overflow-hidden bg-white"> */}
        {/*   <AnimateInView className="absolute size-full "> */}
        {/*     <video */}
        {/*       loop */}
        {/*       playsInline */}
        {/*       autoPlay */}
        {/*       muted */}
        {/*       className="size-full object-cover" */}
        {/*     > */}
        {/*       <source src="/realview.mp4" type="video/mp4" /> */}
        {/*     </video> */}
        {/*   </AnimateInView> */}
        {/*   <div className="absolute size-full bg-black/50"></div> */}
        {/**/}
        {/* </div> */}

        <AnimateInView offsetX={-50} className="space-y-2 mb-10">
          <p className="uppercase md:text-lg xl:text-xl">{data.header}</p>
          <p className="uppercase text-3xl md:text-4xl font-semibold">
            {data.title}
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-5">
            <p className="md:text-lg tracking-tight">{data.description}</p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {data.googleEmbed.map((embed, i) => (
            <iframe
              key={i}
              src={embed.link}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[40vh] rounded-lg"
            />
          ))}
        </div>

        <Marquee className="py-5 rounded-3xl" speed={80}>
          {new Array(17).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-[320px] pl-2 h-52 mr-4 relative cursor-pointer  rounded-lg overflow-hidden"
              onClick={() => {
                setOpen(true);
                setSelected(i);
              }}
            >
              <Image
                src={`https://ik.imagekit.io/z7onzn8tx/Realview_Media/carousel/${i + 1}.jpg`}
                sizes="320px"
                fill
                alt="gallery"
                priority
                className="object-cover hover:scale-105 duration-300 ease-in-out "
              />
            </div>
          ))}
        </Marquee>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-6xl p-0 outline-none px-5 bg-transparent border-none">
            <div className="relative size-full ">
              <div className="absolute w-full aspect-[4/3] top-1/2 -translate-y-1/2 rounded-lg max-h-[80vh] bg-black grid place-items-center">
                <Loader2 className="size-10 text-white animate-spin" />

                <Image
                  src={`https://ik.imagekit.io/z7onzn8tx/Realview_Media/carousel/${selected + 1}.jpg`}
                  sizes="90vw"
                  fill
                  alt="gallery"
                  className="object-cover rounded-lg border"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
