import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-[95%] my-7 bg-orange-50 rounded-lg px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:max-w-lg lg:w-1/2 rounded-xl"
              >
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-lg">
                    <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                    <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="relative">
                      <img
                        className="object-cover object-center mx-auto rounded-lg shadow-2xl"
                        alt="hero"
                        src="https://i.ibb.co/yyCKpmf/360-F-435081753-xs8-LPx-NJK3x0q-IECSc3-E1-ZUMXHKkzk6n.jpg"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center md:items-center lg:items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0"
              >
                <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase">
                  {" "}
                  FitSync Fitness Ceneter{" "}
                </span>
                <h1 className="mb-8 text-[40px] font-bold leading-none tracking-tighter text-neutral-600">
                  Unleash Your Strength:
                  <br />
                  <h1 className="mt-4">Fitness Redefined</h1>
                </h1>
                <p className="mb-8 text-base leading-relaxed text-left text-gray-900">
                  Where Every Workout Tells a Story of Progress. Your Journey to
                  a Healthier, Stronger You Starts Here. Join Our Community of
                  Fitness Enthusiasts
                </p>
                <div className=" max-w-7xl sm:flex">
                  <div className="mt-3 rounded-lg sm:mt-0">
                    <Link to="/classes">
                      <button className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Classes
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Banner;
