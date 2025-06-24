import { motion } from "framer-motion";

export const Hero = () => {

  return (
    <section
      className="w-screen flex justify-center items-center bg-gradient-to-br from-bgDark1 via-bgDark2 to-bgDark3 min-h-screen relative overflow-hidden"
      id="home"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primaryColor/10 via-transparent to-secondaryColor/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primaryColor/5 via-transparent to-transparent"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center pt-20 md:pt-28 lg:pt-32 text-center relative z-10">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight">
            <span className="block mb-2">Decentralize Everything</span>
            <span className="block">with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-secondaryColor">SBC</span></span>
          </h1>
        </motion.div>        {/* Investment Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl lg:text-3xl text-secondaryText leading-relaxed mb-6 font-medium">
              Invest in Senior Blockchain Company and participate in blockchain project profits
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-secondaryText leading-relaxed opacity-90">
              By purchasing SBC tokens, invest in the future of blockchain technology and benefit from our innovative project profits
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 w-full max-w-4xl"
        >
          <div className="text-center p-6 bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder">
            <div className="text-3xl lg:text-4xl font-bold text-primaryColor mb-2">$1M+</div>
            <div className="text-secondaryText text-sm lg:text-base">Total Value Locked</div>
          </div>
          <div className="text-center p-6 bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder">
            <div className="text-3xl lg:text-4xl font-bold text-primaryColor mb-2">50K+</div>
            <div className="text-secondaryText text-sm lg:text-base">Active Investors</div>
          </div>
          <div className="text-center p-6 bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder">
            <div className="text-3xl lg:text-4xl font-bold text-primaryColor mb-2">99.9%</div>
            <div className="text-secondaryText text-sm lg:text-base">Uptime</div>
          </div>
        </motion.div>        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center items-center mb-16"
        >
          {/* Buy Button */}
          <a
            href="/buy"
            className="group relative overflow-hidden bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-secondaryColor hover:to-primaryColor text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primaryColor/25"
            aria-label="Buy SBC"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Invest in SBC
            </span>
          </a>
        </motion.div>

        {/* Investment Call-to-Action Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-secondaryText text-base lg:text-lg leading-relaxed">
            <strong className="text-primaryColor">Investment Opportunity:</strong> Join thousands of investors who trust SBC for secure, profitable blockchain investments with transparent returns and cutting-edge technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
