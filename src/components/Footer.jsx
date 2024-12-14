import { FacebookIcon } from "../assets/icons/FacebookIcon";
import { InstagramIcon } from "../assets/icons/InstagramIcon";
import { SBCLogo } from "../assets/logos/SBCLogo";
import { TwitterIcon } from "../assets/icons/TwitterIcon";

const footerData = [
  {
    title: "Products",
    items: ["Services", "About Us", "News and Stories", "Roadmap"],
  },
  {
    title: "Important Links",
    items: [
      "Organization Team",
      "Our Journeys",
      "Pricing Plans",
      "Roadmap",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "Company",
    items: ["About Us", "Jobs", "Press", "Contact Us"],
  },
];

export const Footer = () => {
  return (
    <footer aria-label="Site footer" className="bg-bgDark1 pt-10 lg:pt-20 pb-8 lg:pb-16">
      <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
        <div className="flex flex-wrap justify-between">
          {/* Logo and About Section */}
          <div className="w-full lg:w-1/3 mb-16 lg:mb-0 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center mb-4">
              <div className="text-white mr-2 text-6xl">
                <SBCLogo />
              </div>
              <div className="text-white font-['Inter'] font-bold text-xl">
                SBC
              </div>
            </div>
            <p className="mb-8 text-gray-400 leading-loose">
              SBC empowers global transactions with its blockchain-based
              solutions, ensuring security, transparency, and efficiency. Join
              us in transforming the digital economy.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.instagram.com/seniorblockchain"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-2/3 flex flex-wrap justify-between lg:pl-16">
            {footerData.map((section, index) => (
              <div
                key={`footer-section-${index}`}
                className="w-full md:w-1/3 lg:w-auto mb-8 lg:mb-0"
              >
                <h3 className="mb-6 text-2xl font-bold text-primaryText">
                  {section.title}
                </h3>
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={`${item}-${itemIndex}`} className="mb-4">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-gray-300 transition"
                        aria-label={item}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        © 2024 SBC. All rights reserved.
      </div>
    </footer>
  );
};
