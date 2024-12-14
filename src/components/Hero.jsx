import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date for the countdown
  const targetDate = new Date("2025-03-01T00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      // Save the remaining time in localStorage
      localStorage.setItem("rialTimer", JSON.stringify({ days, hours, minutes, seconds }));
    };

    // Retrieve timer state from localStorage to persist between refreshes
    const savedTimer = localStorage.getItem("rialTimer");
    if (savedTimer) {
      setTimeLeft(JSON.parse(savedTimer));
    }

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      ".timer-box",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <section
      className="w-screen flex justify-center items-center bg-bgDark1 mb-[12vw] md:mb-[10vw] lg:mb-[6vw] xl:mb-[4vw] 2xl:mb-30 hero-bg-gradient pb-24 sm:pb-8 md:pb-12 lg:pb-0"
      id="home"
    >
      <div className="w-full max-w-6xl flex flex-col justify-center items-center pt-20 md:pt-28 lg:pt-32 text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mt-10">
          Decentralize Everything <br className="hidden sm:block" /> with{" "}
            <span className="text-primaryColor">SBC</span>
          </h1>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center items-center mt-12 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="timer-box bg-primaryColor text-white rounded-lg p-4 w-24 sm:w-28 lg:w-32 shadow-md flex flex-col items-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold">{value}</p>
                <p className="text-sm sm:text-base mt-1 uppercase tracking-wide">{unit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col items-center gap-4 mt-12 pb-12 lg:pb-40">
            {/* Buy Button */}
            <a
              href="/buy"
              className="contained-button bg-primaryColor hover:bg-primaryHover w-64 sm:w-52 h-12 text-white rounded-lg font-bold text-center flex justify-center items-center transition"
              aria-label="Buy SBC"
            >
              Buy SBC
            </a>

            {/* Limited Time Offer Text */}
            <p className="text-secondaryText text-lg mt-6 text-center">
              <strong className="text-primaryColor">Limited Time Offer:</strong> Buy SBC for only 0.01 USDT until 2025-03-01!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
