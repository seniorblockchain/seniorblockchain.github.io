import { motion } from "framer-motion";

export const Hero = () => {

  return (
    <section
      className="w-screen flex justify-center items-center bg-bgDark1 mb-[12vw] md:mb-[10vw] lg:mb-[6vw] xl:mb-[4vw] 2xl:mb-30 hero-bg-gradient pb-24 sm:pb-8 md:pb-12 lg:pb-0"
      id="home"
    >
      <div className="w-full max-w-6xl flex flex-col justify-center items-center pt-20 md:pt-28 lg:pt-32 text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mt-10">
          Decentralize Everything <br className="hidden sm:block" /> with{" "}
            <span className="text-primaryColor">SBC</span>
          </h1>        </motion.div>

        {/* Investment Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-xl sm:text-2xl text-secondaryText leading-relaxed">
              Invest in Senior Blockchain Company and participate in blockchain project profits
            </p>
            <p className="text-lg sm:text-xl text-secondaryText mt-4 leading-relaxed">
              By purchasing SBC tokens, invest in the future of blockchain technology and benefit from our innovative project profits
            </p>
          </div>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col items-center gap-4 mt-12 pb-12 lg:pb-40">
            {/* Buy Button */}
            <a
              href="/buy"
              className="contained-button bg-primaryColor hover:bg-primaryHover w-64 sm:w-52 h-12 text-white rounded-lg font-bold text-center flex justify-center items-center transition"
              aria-label="Buy SBC"
            >
              Buy SBC
            </a>            {/* Investment Call-to-Action Text */}
            <p className="text-secondaryText text-lg mt-6 text-center max-w-2xl mx-auto">
              <strong className="text-primaryColor">Investment Opportunity:</strong> Invest in our company by purchasing SBC tokens and benefit from future project profits
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
