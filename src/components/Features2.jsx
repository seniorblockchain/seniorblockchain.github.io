import { motion } from "framer-motion";

export const Features2 = () => {
  const stats = [
    { number: "99.9%", label: "Uptime", icon: "⚡" },
    { number: "<0.01%", label: "Transaction Fee", icon: "💰" },
    { number: "15K+", label: "Active Users", icon: "👥" },
    { number: "24/7", label: "Support", icon: "🛡️" }
  ];

  const advantages = [
    {
      title: "Instant Settlements",
      description: "Complete transactions in seconds, not minutes or hours",
      icon: "🚀"
    },
    {
      title: "Smart Contracts",
      description: "Automated, secure, and transparent contract execution",
      icon: "📝"
    },
    {
      title: "Cross-Chain",
      description: "Seamless integration with multiple blockchain networks",
      icon: "🔗"
    }
  ];

  return (
    <section 
      className="w-full py-20"
      style={{ background: "#0f1419" }}
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
                Performance & Reliability
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
                Numbers That Speak for Themselves
              </h2>
              <p className="mt-6 text-xl text-[#aab2bb] max-w-3xl mx-auto leading-relaxed">
                SBC delivers exceptional performance with industry-leading metrics and 
                uncompromising reliability for your financial operations.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-[#17212b] border border-[#2d3a4b] rounded-2xl p-8 text-center hover:border-[#2aabee]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-[#2aabee] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#aab2bb] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Advantages Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                Advanced Technology Stack
              </h3>
              <p className="text-[#aab2bb] text-lg leading-relaxed mb-10">
                Built on cutting-edge blockchain infrastructure, SBC provides enterprise-grade 
                solutions with consumer-friendly simplicity. Experience the future of digital finance today.
              </p>
              
              <div className="space-y-6">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#17212b] border border-[#2d3a4b] rounded-xl hover:border-[#2aabee]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-3xl flex-shrink-0">{advantage.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {advantage.title}
                      </h4>
                      <p className="text-[#aab2bb]">{advantage.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Interactive Demo */}
            <motion.div
              className="lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-[#17212b] border border-[#2d3a4b] rounded-2xl p-8 text-center relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2aabee]/5 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6">💎</div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Premium Experience
                  </h4>
                  <p className="text-[#aab2bb] mb-8 leading-relaxed">
                    Join the elite network of SBC users and experience blockchain technology 
                    at its finest. Fast, secure, and always reliable.
                  </p>
                  
                  {/* Mini feature list */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Multi-signature security",
                      "Real-time notifications", 
                      "Advanced analytics dashboard"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-sm text-[#aab2bb]">
                        <div className="w-2 h-2 bg-[#2aabee] rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <motion.a
                    href="/buy"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2aabee] hover:bg-[#1e96d3] text-white font-semibold rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Experience SBC
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
