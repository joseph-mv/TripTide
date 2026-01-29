export const shadowAnimation = {
  filter: [
    "drop-shadow(0px 0px 0px rgba(248, 15, 15, 0))",
    "drop-shadow(2px 2px 2px rgba(248, 15, 15, 0.25))",
    "drop-shadow(5px 5px 5px rgba(248, 15, 15, 0.5))",
    "drop-shadow(7px 7px 7px rgba(248, 15, 15, 0.75))",
    "drop-shadow(10px 10px 10px rgba(248, 15, 15, 1))",
    "drop-shadow(7px 7px 7px rgba(248, 15, 15, 0.75))",
    "drop-shadow(5px 5px 5px rgba(248, 15, 15, 0.5))",
    "drop-shadow(2px 2px 2px rgba(248, 15, 15, 0.25))",
  ],
  transition: {
    filter: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const wavingAnimation = {
  x: [0, 5, -5, 0],
  skewX: [0, 5, -5, 0],
  transition: {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  },
};
