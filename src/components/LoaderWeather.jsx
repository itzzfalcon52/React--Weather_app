import { motion } from "motion/react";

const loadingContainerVariant = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingCircleVariant = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.8,
  repeat: Infinity,
  ease: "easeInOut",
};

function LoaderWeather() {
  return (
    <div className="flex flex-col justify-around items-center">
      <motion.div
        className="flex w-32 h-32  justify-around "
        variants={loadingContainerVariant}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-8 h-8 m-2 bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="block w-8 h-8 m-2  bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="block w-8 h-8 m-2 bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
      <div className="text-3xl mt-4 text-white font-bricolage font-medium">
        Loading...
      </div>
    </div>
  );
}

export default LoaderWeather;
