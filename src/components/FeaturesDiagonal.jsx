import { motion } from "framer-motion";

export const FeaturesDiagonal = () => {
  const features = [
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "Bank-level security protects your digital assets with advanced encryption."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Process transactions in seconds with minimal fees on the TON blockchain."
    },
    {
      icon: "🌐",
      title: "Global Access",
      description: "Send and receive payments anywhere in the world, 24/7."
    },
    {
      icon: "💎",
      title: "Premium Features",
      description: "Advanced tools for trading, staking, and portfolio management."
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track your investments with live charts and market data."
    },
    {
      icon: "🎯",
      title: "Smart Automation",
      description: "Automated trading and smart contract execution for optimal returns."
    }
  ];

  return (
    <section className="relative w-full py-20 bg-[#17212b]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-[#2aabee]">SBC</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of digital finance with our innovative blockchain technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#232e3c] rounded-xl p-6 hover:bg-[#2a3441] transition-all duration-300 border border-gray-700 hover:border-[#2aabee]/30"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="/buy"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2aabee] hover:bg-[#1e96d3] text-white font-semibold rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started Today</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
