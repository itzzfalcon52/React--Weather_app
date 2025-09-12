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

function LoaderFullScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-Neutral-900 ">
      <motion.div
        className="flex h-full w-full  justify-center items-center "
        variants={loadingContainerVariant}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-12 h-12 m-2 bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="block w-12 h-12 m-2  bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="block w-12 h-12 m-2 bg-white rounded-full "
          variants={loadingCircleVariant}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
    </div>
  );
}

export default LoaderFullScreen;
