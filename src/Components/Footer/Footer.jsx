import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="w-[90%] mx-auto pt-[60px] pb-[30px]">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <a href="#">
                  <img
                    className="w-[60%] md:w-[40%] lg:w-[60%]"
                    src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png"
                    alt=""
                  />
                </a>

                <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                  Your Journey to a Healthier, Stronger You Starts Here. Join
                  Our Community of Fitness Enthusiasts
                </p>

                <div className="flex mt-6 gap-6">
                  <BsFacebook className="text-gray-600 text-[23px] cursor-pointer" />
                  <BsPinterest className="text-gray-600 text-[23px] cursor-pointer" />
                  <BsDiscord className="text-gray-600 text-[23px] cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    About
                  </h3>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Instruments
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Career
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Community
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Blog
                  </h3>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Workout
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Food Habit
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Body Building
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Top Trainers
                  </h3>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    John McCulling
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Allison Hunt
                  </a>
                  <a className="cursor-pointer block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Robert Greyson
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Contact
                  </h3>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    +1 526 654 8965
                  </span>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    fitsync@gmail.com
                  </span>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    Mirpur 2, Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              © FitSync 2023 - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
