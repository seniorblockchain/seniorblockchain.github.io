import { motion } from "framer-motion";

const tokenomicsData = [
  { category: "Team & Founders", allocation: "15%", tokens: "38,400,000 SBC", details: "Locked for 2 years; gradually unlocked over 4 semi-annual periods", color: "bg-orange-400" },
  { category: "Initial & Public Sale", allocation: "35%", tokens: "89,600,000 SBC", details: "Includes 15% private sale and 20% public sale", color: "bg-primaryColor" },
  { category: "Marketing & Development", allocation: "20%", tokens: "51,200,000 SBC", details: "For advertising campaigns and strategic partnerships", color: "bg-secondaryColor" },
  { category: "Network Rewards", allocation: "20%", tokens: "51,200,000 SBC", details: "Staking and user activity rewards to boost engagement", color: "bg-green-400" },
  { category: "Strategic Reserve", allocation: "10%", tokens: "25,600,000 SBC", details: "Reserved for emergencies and long-term development", color: "bg-blue-400" },
];

const tokenInfo = {
  name: "Senior Blockchain Company",
  symbol: "SBC",
  supply: "256,000,000",
  decimals: "8",
  address: "EQBIQe_KkVxaJmga7LVgwvB8lcXbbfsqdziGgDXfD-zW4KU9"
};

export const Tokenomics = () => {
  return (
    <section className="w-full bg-gradient-to-br from-bgDark2 via-bgDark3 to-bgDark1 py-20 px-2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primaryColor font-semibold text-lg uppercase tracking-widest block mb-2">
              SBC Tokenomics
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Strategic Token Distribution
            </h2>
            <div className="text-secondaryText mt-4 space-y-2 text-base sm:text-lg">
              <p>Total Supply: <span className="text-primaryColor font-bold">{tokenInfo.supply} {tokenInfo.symbol}</span></p>
              <p>Smart Contract: <span className="text-primaryColor break-all">{tokenInfo.address}</span></p>
              <p className="mt-4">
                SBC token powers our ecosystem of Programming, Blockchain, and AI services, 
                built on the TON network with a vision to <span className="text-primaryColor font-semibold">Decentralize Everything</span>
              </p>
            </div>
          </div>

          {/* Tokenomics Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {tokenomicsData.map((data, idx) => (
              <motion.div
                key={data.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-bgDark2/80 border border-mainBorder rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:scale-[1.025] transition-transform duration-300"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-bold ${data.color} shadow-lg shrink-0`}>
                  {data.allocation}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-primaryText mb-1 truncate">{data.category}</h3>
                  <p className="text-secondaryText text-sm mb-1 truncate">{data.tokens}</p>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{data.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tokenomics Bar Visualization */}
          <div className="w-full flex flex-col gap-3 mt-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {tokenomicsData.map((data, idx) => (
                <div key={data.category} className="flex items-center gap-2">
                  <span className={`inline-block w-4 h-4 rounded-full ${data.color}`}></span>
                  <span className="text-xs text-secondaryText font-medium">{data.category}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-6 bg-bgDark3 rounded-lg overflow-hidden flex mt-2 border border-mainBorder">
              {tokenomicsData.map((data, idx) => (
                <div
                  key={data.category}
                  className={`${data.color} h-full`}
                  style={{ width: data.allocation }}
                  title={data.category}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
