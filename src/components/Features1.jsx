import { motion } from "framer-motion";

import feature1 from "../assets/images/feature1.jpg";
import feature2 from "../assets/images/feature2.jpg";
import feature3 from "../assets/images/feature3.jpg";
import feature4 from "../assets/images/feature4.jpg";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features1 = () => {
  return (
    <section
      className="w-full bg-bgDark2 pt-4 -mt-8 mb-8 sm:-mt-8 sm:mb-24 xl:-mt-8 2xl:mt-0 md:pt-[4vw] lg:pt-4"
      id="features"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
              <span className="block-subtitle">Empower Your Transactions</span>
              <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
                Why Choose SBC?
              </h2>
              <p className="mb-10 text-secondaryText leading-loose">
                SBC redefines digital transactions with its secure,
                efficient, and transparent blockchain technology. Empower your
                financial processes with unparalleled features designed for the
                modern economy.
              </p>
              <ul className="mb-6 text-primaryText">
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Secure blockchain transactions</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Low transaction fees for global accessibility</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Seamless integration with wallets and platforms</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Content (Images) */}
          <div className="w-3/4 mx-auto lg:w-1/2 flex flex-wrap lg:-mx-4 sm:pr-8 lg:pt-10 justify-center lg:pl-4 xl:px-8">
            <div className="mb-8 lg:mb-0 w-full sm:w-1/2 px-2 lg:px-0">
              <div className="mb-4 py-3 pl-3 pr-2 rounded">
                <img
                  src={feature1.src}
                  alt="Fast Transactions"
                  className="rounded-xl main-border-gray mx-auto sm:mx-unset"
                  aria-label="Fast Transactions"
                />
                <p className="text-white text-center mt-4 text-sm">
                  Fast Transactions
                </p>
              </div>
              <div className="py-3 pl-3 pr-2 rounded">
                <img
                  src={feature2.src}
                  alt="Scalable Solutions"
                  className="rounded-xl main-border-gray mx-auto sm:mx-unset"
                  aria-label="Scalable Solutions"
                />
                <p className="text-white text-center mt-4 text-sm">
                  Scalable Solutions
                </p>
              </div>
            </div>
            <div className="w-1/2 lg:mt-20 pt-12 lg:pt-0 px-2 hidden sm:inline-block">
              <div className="mb-4 py-3 pl-3 pr-2 rounded-lg">
                <img
                  src={feature3.src}
                  alt="Enhanced Security"
                  className="rounded-xl main-border-gray"
                  aria-label="Enhanced Security"
                />
                <p className="text-white text-center mt-4 text-sm">
                  Enhanced Security
                </p>
              </div>
              <div className="py-3 pl-3 pr-2 rounded-lg">
                <img
                  src={feature4.src}
                  alt="User-Centric Design"
                  className="rounded-xl main-border-gray"
                  aria-label="User-Centric Design"
                />
                <p className="text-white text-center mt-4 text-sm">
                  User-Centric Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
