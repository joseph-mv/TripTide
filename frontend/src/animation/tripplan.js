export const  pageVariants1 = {
    initial: { opacity: 0.5, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0.5, x: 100 },
  };
  export const pageVariants2 = {
    initial: { opacity: 0.5, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1,
  };