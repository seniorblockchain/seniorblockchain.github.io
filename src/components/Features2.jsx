import { motion } from "framer-motion";

import feature5 from "../assets/images/feature5.jpg";
import feature6 from "../assets/images/feature6.jpg";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features2 = () => (
  <section className="w-full bg-bgDark2 mt-12 sm:mt-24 mb-12 lg:my-20 lg:mb-24 pt-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
        {/* Image Section */}
        <div className="w-11/12 sm:w-3/4 mx-auto lg:w-1/2 flex flex-wrap lg:-mx-4 sm:pr-8 justify-center order-last lg:order-first">
          <div className="mb-8 lg:mb-0 w-full px-2 lg:pl-16 flex flex-col justify-center md:pl-8">
            <div className="mb-4 py-3 md:pl-3 md:pr-20 lg:pr-12 rounded">
              <img
                src={feature5.src}
                alt="Low Transaction Costs"
                className="rounded-xl main-border-gray"
              />
              <p className="text-white text-center mt-4 text-sm">
                Low Transaction Costs
              </p>
            </div>
            <div className="py-3 md:pl-20 lg:pl-12 md:pr-2 rounded">
              <img
                src={feature6.src}
                alt="Global Accessibility"
                className="rounded-xl main-border-gray"
              />
              <p className="text-white text-center mt-4 text-sm">
                Global Accessibility
              </p>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 xl:pl-8">
          <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
            <span className="block-subtitle">Empower Your Economy</span>
            <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
              Advanced Features of SBC
            </h2>
            <p className="mb-12 text-secondaryText leading-loose">
              SBC offers cutting-edge solutions for secure and efficient
              transactions, ensuring global access and financial inclusivity.
              Embrace the future of digital finance with these innovative
              features.
            </p>
            <ul className="mb-6 text-primaryText">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Low fees for every transaction</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Borderless payments for global accessibility</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Decentralized and secure blockchain technology</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
