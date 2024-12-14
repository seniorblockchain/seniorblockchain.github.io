import { motion } from "framer-motion";
import featuresdiagonal from "../assets/images/featuresdiagonal.jpg";

export const FeaturesDiagonal = () => {
  return (
    <section className="lg:mb-16 w-full flex-col justify-center items-center">
 

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="2xl:w-[1150px] xl:w-[1050px] md:w-4/5 flex justify-center pt-12 lg:pt-24 pb-8 lg:pb-20 mx-auto lg:flex-row flex-col">
          {/* Left Content */}
          <div className="w-3/4 lg:w-1/2 flex flex-col lg:mx-unset mx-auto">
            <span className="block-subtitle text-primaryColor">
              Transform Your Economy
            </span>
            <h2 className="mt-10 mb-8 text-4xl lg:text-5xl block-big-title text-white">
              Empower Financial Freedom
            </h2>
            <p className="mb-16 text-secondaryText leading-loose">
              SBC enables secure, fast, and transparent transactions,
              bridging the gap between traditional and modern digital economies.
              Unlock the potential of blockchain for everyday financial needs.
            </p>
            <div className="flex gap-4">
              <a
                href="/buy"
                className="w-[210px] h-12 contained-button bg-primaryColor text-white rounded-lg flex justify-center items-center hover:bg-primaryHover transition"
                aria-label="Buy SBC"
              >
                Buy Now
              </a>
              <a
                href="/sell"
                className="w-[210px] h-12 contained-button bg-white text-primaryColor border border-primaryColor rounded-lg flex justify-center items-center hover:bg-bgDark3 hover:text-white transition"
                aria-label="Sell SBC"
              >
                Sell Now
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-4/5 lg:w-1/2 lg:pl-16 flex justify-center mx-auto pt-16 lg:pt-0">
            <img
              src={featuresdiagonal.src}
              alt="Empower Financial Freedom with SBC"
              className="rounded-xl main-border-gray"
            />
          </div>
        </div>
      </motion.div>

    
    </section>
  );
};
