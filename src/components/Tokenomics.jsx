import { motion } from "framer-motion";

const tokenomicsData = [
  { category: "Team & Founders", allocation: "15%", tokens: "38,400,000 SBC", details: "Locked for 2 years; gradually unlocked over 4 semi-annual periods" },
  { category: "Initial & Public Sale", allocation: "35%", tokens: "89,600,000 SBC", details: "Includes 15% private sale and 20% public sale" },
  { category: "Marketing & Development", allocation: "20%", tokens: "51,200,000 SBC", details: "For advertising campaigns and strategic partnerships" },
  { category: "Network Rewards", allocation: "20%", tokens: "51,200,000 SBC", details: "Staking and user activity rewards to boost engagement" },
  { category: "Strategic Reserve", allocation: "10%", tokens: "25,600,000 SBC", details: "Reserved for emergencies and long-term development" },
];

const tokenInfo = {
  name: "Senior Blockchain Company",
  symbol: "SBC",
  supply: "256,000,000",
  decimals: "8",
  address: "EQBIQe_KkVxaJmga7LVgwvB8lcXbbfsqdziGgDXfD-zW4KU9"
};

export const Tokenomics = () => {
  // Calculate scaling factor based on maximum allocation
  const maxAllocation = Math.max(...tokenomicsData.map(data => parseInt(data.allocation)));
  const scalingFactor = 100 / maxAllocation;

  return (
    <section className="w-screen bg-bgDark2 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primaryColor font-medium text-lg">
              SBC Tokenomics
            </span>
            <h2 className="text-4xl font-bold text-primaryText mt-4">
              Strategic Token Distribution
            </h2>
            <div className="text-secondaryText mt-4 space-y-2">
              <p>Total Supply: {tokenInfo.supply} {tokenInfo.symbol}</p>
              <p>Smart Contract: <span className="text-primaryColor">{tokenInfo.address}</span></p>
              <p className="mt-4">
                SBC token powers our ecosystem of Programming, Blockchain, and AI services, 
                built on the TON network with a vision to "Decentralize Everything"
              </p>
            </div>
          </div>

          {/* Updated Tokenomics Sections */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {tokenomicsData.map((data, index) => {
              const rawPercentage = parseInt(data.allocation);
              const scaledWidth = rawPercentage * scalingFactor;
              
              return (
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${scaledWidth}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative bg-bgDark3 rounded-lg shadow-lg p-6 w-full md:max-w-[calc(var(--scaled-width))]"
                  style={{
                    minWidth: '280px',
                    '--scaled-width': `${scaledWidth}%`
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primaryText">
                        {data.category}
                      </h3>
                      <p className="text-gray-400 mt-1">{data.tokens}</p>
                      <p className="text-sm text-gray-500 mt-1">{data.details}</p>
                    </div>
                    <div className="text-primaryColor text-2xl font-bold ml-4">
                      {data.allocation}
                    </div>
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-primaryColor rounded-b-lg" 
                    style={{ width: '100%', opacity: 0.3 }} 
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
