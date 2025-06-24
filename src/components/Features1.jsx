import { motion } from "framer-motion";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features1 = () => {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Process transactions in seconds with our optimized blockchain network"
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      description: "Advanced encryption and security protocols protect your assets"
    },
    {
      icon: "💰",
      title: "Low Fees",
      description: "Minimal transaction costs for maximum value transfer"
    },
    {
      icon: "🌐",
      title: "Global Access",
      description: "24/7 worldwide accessibility from any device, anywhere"
    }
  ];

  return (
    <section
      className="w-full pt-20 pb-16"
      id="features"
      style={{ background: "#17212b" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#2aabee] text-lg font-semibold tracking-wide uppercase">
                Why Choose SBC
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
                Revolutionary Blockchain Features
              </h2>
              <p className="mt-6 text-xl text-[#aab2bb] max-w-3xl mx-auto leading-relaxed">
                Experience the next generation of digital finance with secure, efficient, 
                and transparent blockchain technology designed for the modern economy.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#232e3c] border border-[#2d3a4b] rounded-2xl p-8 text-center hover:bg-[#2a3441] transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#aab2bb] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits List */}
          <motion.div
            className="mt-20 bg-[#232e3c] border border-[#2d3a4b] rounded-2xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Built for the Future of Finance
                </h3>
                <p className="text-[#aab2bb] text-lg leading-relaxed mb-8">
                  SBC combines cutting-edge technology with user-friendly design to deliver 
                  an unparalleled blockchain experience for individuals and businesses.
                </p>
                <div className="space-y-4">
                  {[
                    "Advanced smart contract functionality",
                    "Cross-chain compatibility and interoperability", 
                    "Eco-friendly proof-of-stake consensus",
                    "Developer-friendly API and tools"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <CheckArrowIcon />
                      </div>
                      <span className="text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:pl-8">
                <div className="bg-[#17212b] border border-[#2d3a4b] rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h4 className="text-2xl font-bold text-white mb-4">Ready to Start?</h4>
                  <p className="text-[#aab2bb] mb-6">
                    Join thousands of users already using SBC for their financial needs.
                  </p>
                  <a
                    href="/buy"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2aabee] hover:bg-[#1e96d3] text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
