import React from "react";
import { motion } from "framer-motion";
import { Cloud, MapPin, BarChart3, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-purple-900">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3">
              <Zap className="text-white" size={24} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-bricolage text-white">
              Umbrella
              <span className="text-purple-400 font-bricolage">Alert!</span>
            </h1>
          </div>
          <motion.p
            className="text-lg text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get accurate weather forecasts and compare cities worldwide
          </motion.p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 w-full "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Weather Search Card */}
          <Link to="search">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="cursor-pointer"
              onClick={() => {
                console.log("Navigate to /weather");
              }}
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Cloud className="text-white" size={24} />
                  </div>
                  <MapPin className="text-purple-400" size={20} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  Weather Search
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  Get instant weather updates for any city. Real-time conditions
                  and detailed forecasts.
                </p>

                <div className="flex items-center text-purple-400 font-medium group">
                  <span className="group-hover:text-purple-300 transition-colors">
                    Explore Weather
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Weather Comparison Card */}
          <Link to="compare">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="cursor-pointer"
              onClick={() => {
                console.log("Navigate to /compare");
              }}
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <BarChart3 className="text-blue-400" size={20} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  Compare Cities
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  Side-by-side weather comparison for two cities. Perfect for
                  travel planning.
                </p>

                <div className="flex items-center text-blue-400 font-medium group">
                  <span className="group-hover:text-blue-300 transition-colors">
                    Start Comparing
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center text-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Built with ❤️ by
          <a
            className=" text-white text-lg ml-2 border-b-2 border-b-Neutral-0 hover:scale-200 cursor-pointer"
            href="https://github.com/itzzfalcon52"
          >
            Hussain Kagalwala
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
