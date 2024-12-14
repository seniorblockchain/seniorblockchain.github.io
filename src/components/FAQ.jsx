import { useState } from "react";
import { motion } from "framer-motion";

const FAQData = [
  {
    question: "What is SBC?",
    answer:
      "SBC (SBC) is a blockchain-based cryptocurrency developed on the TON network. It is designed to revolutionize asset management by providing a secure, transparent, and efficient platform for online transactions, staking, and more.",
  },
  {
    question: "How can I purchase SBC?",
    answer:
      "You can purchase SBC during the Initial Coin Offering (ICO) or through cryptocurrency exchanges where SBC is listed. Ensure you have a compatible TON-compatible wallet to store your SBC tokens securely.",
  },
  {
    question: "What are the use cases for SBC?",
    answer:
      "SBC can be used for a variety of purposes, including online shopping, digital content purchases, metaverse integration, in-app purchases, peer-to-peer transactions, loyalty programs, and event ticketing. Its versatility allows it to be integrated seamlessly into various industries.",
  },
  {
    question: "How secure is SBC?",
    answer:
      "SBC leverages the security features of blockchain technology, including decentralized ledger systems and smart contracts, to ensure tamper-proof transactions and data safety. Additional layers of encryption and secure protocols make SBC a highly secure digital currency.",
  },
  {
    question: "Does SBC support staking?",
    answer:
      "Yes, SBC supports staking programs where token holders can participate in the network, secure the blockchain, and earn SBC rewards as incentives.",
  },
  {
    question: "What is SBC’s role in the metaverse?",
    answer:
      "SBC is designed to be a versatile currency for the metaverse, enabling users to purchase virtual assets like land, avatars, and services. It facilitates seamless transactions within virtual ecosystems while fostering a vibrant digital economy.",
  },
  {
    question: "How can I stay updated on SBC developments?",
    answer:
      "Stay informed by following SBC on social media platforms like Twitter, Telegram, and Discord. You can also visit our official website and subscribe to our newsletter for the latest updates and announcements.",
  },
];

export const FAQ = () => (
  <section className="relative -mt-8 sm:mt-0 pt-12 sm:pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="FAQ" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <p className="mb-7 block-subtitle text-center">Have any questions?</p>
          <h2 className="mb-16 block-big-title text-center">
            Frequently Asked Questions
          </h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {FAQData.map((item, index) => (
              <div className="w-full p-1" key={`${item.question}-${index}`}>
                <FAQBox
                  title={item.question}
                  content={item.answer}
                  key={`${item.question}-${item.answer}`}
                  defaultOpen={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FAQBox = ({ defaultOpen, title, content }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="pt-2 sm:pt-6 pb-2 px-3 sm:px-8 rounded-3xl bg-bgDark3 main-border-gray-darker mb-4 relative hover:bg-bgDark3Hover cursor-pointer transition"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col p-2 justify-center items-start">
        <h3 className="content-title pt-3 sm:pt-0 pr-8 sm:pr-0">{title}</h3>
        <p
          className={`text-secondaryText pt-4 transition-height duration-300 overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {content}
        </p>
      </div>
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500 ${
            isOpen ? "rotate-[180deg]" : "rotate-[270deg]"
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
