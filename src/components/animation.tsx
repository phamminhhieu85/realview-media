import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { motion, useAnimate, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  className?: ClassValue;
}

export default function AnimateInView({
  children,
  offsetX,
  offsetY,
  scale = 1,
  duration = 0.5,
  delay = 0,
  className,
}: Props) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope);

  useEffect(() => {
    if (inView) {
      animate(
        scope.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        },
        {
          duration,
          delay,
        },
      );
    } else {
      animate(
        scope.current,
        {
          opacity: 0,
          x: offsetX,
          y: offsetY,
          scale,
        },
        {
          duration,
          delay,
        },
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.div
      className={cn(className)}
      ref={scope}
      initial={{ opacity: 0, x: offsetX, y: offsetY }}
    >
      {children}
    </motion.div>
  );
}
