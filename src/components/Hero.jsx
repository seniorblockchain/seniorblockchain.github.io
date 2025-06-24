import { motion } from "framer-motion";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      id="home"
      style={{
        background: "linear-gradient(135deg, #17212b 0%, #0f1419 100%)"
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2aabee]/10 via-transparent to-[#2aabee]/5"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232aabee' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-16"
        >
 

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.85] tracking-tight">
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                The Smart Way to
              </motion.span>
              <motion.span 
                className="block text-[#2aabee] mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Invest in Crypto
              </motion.span>
            </h1>
            
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#aab2bb] leading-relaxed font-light">
                SBC brings institutional-grade blockchain technology to everyone. 
                <span className="text-white font-medium"> Secure, scalable, and profitable.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Value Propositions */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: "💎",
                title: "Premium Returns",
                desc: "Up to 15% APY with our advanced staking protocols"
              },
              {
                icon: "🛡️",
                title: "Ultra Secure",
                desc: "Military-grade encryption protects your investments"
              },
              {
                icon: "🌍",
                title: "Global Access",
                desc: "Trade 24/7 from anywhere in the world"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#232e3c]/60 backdrop-blur-sm border border-[#2d3a4b] rounded-2xl p-8 text-center hover:bg-[#2a3441]/80 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#aab2bb] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="/buy"
                className="group relative px-12 py-5 bg-[#2aabee] hover:bg-[#1e96d3] text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span>Start Investing</span>
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e96d3] to-[#2aabee] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>

              <motion.a
                href="#learn-more"
                className="px-12 py-5 border-2 border-[#2aabee]/50 text-[#2aabee] hover:bg-[#2aabee] hover:text-white font-semibold text-xl rounded-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </div>
            
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
