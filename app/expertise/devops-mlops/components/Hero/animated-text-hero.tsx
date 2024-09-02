"use client"
import React from "react";
import { motion, useInView, Variants } from "framer-motion";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

interface AnimatedTextProps {
  texts: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
      }, 3000); // Change text every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isInView, texts]);

  return (
    <div ref={ref}>
      <motion.h2
        variants={FADE_UP_ANIMATION_VARIANTS}
        transition={{ duration: 1 }}
        className="text-base font-semibold leading-7 text-muted-foreground mx-auto text-right animate-pulse"
      >
        {texts[textIndex]}
      </motion.h2>
      <motion.p
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="mt-2 text-lg font-bold tracking-tight sm:text-4xl text-right animated-gradient pb-2"
      >
        DevOps is a set of practices that combine software
        development, MLOps extends these principles to machine
        learning
      </motion.p>
      <motion.p
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="mt-6 text-lg leading-8 text-right"
      >
        Both practices aim to streamline workflows, automate processes, and ensure continuous integration and delivery.
      </motion.p>
    </div>
  );
};

export default AnimatedText;