"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  isHidden,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  isHidden?: boolean;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const inView = useInView(scope);

  useEffect(() => {
    if (!inView) return;
    (async () => {
      if (inView) {
        // Show the words
        await animate(
          "span",
          {
            display: "inline-block",
            opacity: 1,
            width: "fit-content",
          },
          {
            duration: 0.2,
            delay: stagger(0.05),
            ease: "easeInOut",
          },
        );

        if (isHidden) return;
        // Hide the words
        await new Promise((resolve) =>
          setTimeout(() => {
            animate(
              "span",
              {
                opacity: 0,
                width: 0,
              },
              {
                duration: 0.2,
                delay: stagger(0.05, { from: "last" }),
                ease: "easeInOut",
              },
            );
            resolve(null);
          }, 500),
        );
      }
    })();
  }, [words, inView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className,
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-sm md:text-xl font-semibold flex items-center",
        className,
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-0.5 h-7 bg-black",
          cursorClassName,
        )}
      ></motion.span>
    </div>
  );
};
