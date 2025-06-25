import { motion } from "framer-motion";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      className="w-full min-h-[60vh] flex items-center justify-center bg-[#17212b] pt-20"
      id="home"
    >
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Main Headline */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              <span className="text-[#2aabee]">Decentralize</span> Everything
              <br className="hidden sm:inline" />
              <span className="text-[#2aabee]">with SBC</span>
            </h1>
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-base sm:text-lg text-[#aab2bb] leading-relaxed font-light">
                SBC brings institutional-grade blockchain technology to everyone.
                <span className="text-white font-medium"> Secure, scalable, and profitable.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/buy"
                className="px-8 py-3 bg-[#2aabee] hover:bg-[#1e96d3] text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
              >
                Start Investing
              </a>
              <a
                href="#learn-more"
                className="px-8 py-3 border border-[#2aabee] text-[#2aabee] hover:bg-[#2aabee] hover:text-white font-semibold rounded-xl transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
