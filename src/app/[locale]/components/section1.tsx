"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewrite-effect";
import { useEffect, useState } from "react";
import { Camera, Mic, Search } from "lucide-react";
import { splitWords } from "@/lib/utils";
import Image from "next/image";
import Menu from "./menu";

interface Props {
  data: {
    title: string;
    words: { word: string }[];
  };
}

export default function Section1({ data }: Props) {
  const [words, setWords] = useState(data.words[0].word);

  useEffect(() => {
    setTimeout(() => {
      setWords(data.words[1].word);
    }, 2000);

    setTimeout(() => {
      setWords(data.words[2].word);
      setStop(true);
    }, 4000);

    setTimeout(() => {
      setState(false);
    }, 6800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [state, setState] = useState(true);
  const [stop, setStop] = useState(false);

  return (
    <div>
      <div className="absolute z-10 mx-auto w-full pt-10">
        {!state && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative flex justify-between items-center w-full container max-w-6xl"
          >
            <div className="relative w-[150px] h-[35px] sm:w-[200px] sm:h-[45px] bg-white rounded-full">
              <Image
                src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/logo.png"
                fill
                alt="realview"
                className="scale-90"
                priority
              />
            </div>

            <Menu />
          </motion.div>
        )}
      </div>

      <div className="relative h-screen overflow-hidden">
        <Image
          src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/bg.jpg"
          fill
          alt="background"
          priority
          className="object-cover"
        />

        <div className="absolute bg-black/30 inset-0" />

        <div className="relative h-full container max-w-6xl">
          <AnimatePresence mode="wait">
            {state && (
              <div className="grid place-items-center h-full">
                <motion.div
                  className="h-14 md:h-16 w-[95%] md:w-full rounded-full bg-white flex items-center px-3 md:px-6 overflow-hidden gap-2"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Search strokeWidth={2} size={20} />

                  <div className="grow">
                    <TypewriterEffect
                      words={splitWords(words)}
                      isHidden={stop}
                    />
                  </div>

                  <Mic strokeWidth={2} size={20} />
                  <Camera strokeWidth={2} size={20} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {!state && (
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-10 md:gap-20 items-center h-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col text-3xl md:text-4xl lg:text-5xl text-white font-bold gap-y-2"
              >
                <p className="text-center lg:text-left uppercase max-w-[600px] leading-[60px]">
                  {data.title}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className=" shrink-0 relative w-[300px] h-[120px] md:w-[350px] md:h-[145px]"
              >
                <Image
                  src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/review.webp"
                  priority
                  fill
                  alt="bubble"
                  sizes="350px"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
