import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null); // Ref to track the section
  const isInView = useInView(ref, { once: true, threshold: 0.2 }); // Trigger animation once when 20% of the section is visible

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <motion.section
        className="overflow-hidden bg-white py-8 sm:py-16"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
            variants={itemVariants}
          >
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <motion.h2
                  className="text-base font-semibold leading-7 text-indigo-600"
                  variants={itemVariants}
                >
                  Get to know
                </motion.h2>
                <motion.p
                  className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                  variants={itemVariants}
                >
                  About The FitSync
                </motion.p>
                <motion.p
                  ref={ref}
                  className="mt-6 text-lg leading-8 text-gray-600"
                  variants={itemVariants}
                >
                  Where we promote Fitness Beyond Boundaries
                </motion.p>

                <motion.div className="mt-10" variants={itemVariants}>
                  {[
                    "Dedicated to inspiring and guiding your fitness journey, we are passionate advocates committed to your health and well-being.",
                    "Join a supportive fitness community that fosters motivation and camaraderie. At FitSync, we believe in the power of unity.",
                  ].map((text, index) => (
                    <motion.div
                      key={index}
                      className={`relative flex gap-5 ${
                        index > 0 ? "mt-5" : ""
                      }`}
                      variants={itemVariants}
                    >
                      <IoMdCheckmarkCircleOutline
                        fontSize={"50"}
                        className="text-green-500"
                      />
                      <dd className="inline">{text}</dd>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            <motion.img
              src="https://i.ibb.co/6PyjMVP/pexels-anush-gorak-1229356.jpg"
              className="rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width="2432"
              height="1442"
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
