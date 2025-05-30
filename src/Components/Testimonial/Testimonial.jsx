import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Testimonial = () => {
  const ref = useRef(null); // Ref to track the section
  const isInView = useInView(ref, { once: true, threshold: 0.2 }); // Trigger animation once when 20% of the section is visible

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      <motion.section
        className="py-12 text-blue-900 sm:py-16 lg:py-20"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <motion.div className="text-center" variants={cardVariants}>
              <p className="text-lg font-medium text-blue-600">
                What members say about their experience with us
              </p>
              <h2 className="mt-4 text-3xl font-bold text-blue-900 sm:text-4xl xl:text-5xl">
                Members Testimonials
              </h2>
            </motion.div>

            <motion.div
              className="relative mx-auto mt-20 grid max-w-lg grid-cols-1 gap-16 md:max-w-none md:grid-cols-1 lg:grid-cols-3"
              variants={containerVariants}
            >
              {[
                {
                  title: "Absolutely recommended!",
                  text: "FitSync revolutionized my fitness journey. Expert trainers, personalized programs, and a vibrant community create an inspiring atmosphere. Truly life-changing experience.",
                  name: "James Khawalski",
                  role: "Gold Member",
                },
                {
                  title: "Service was amazing!",
                  text: "FitSync offers unparalleled fitness. Diverse programs, motivating trainers, and a supportive community make every workout rewarding. Transformative and results-driven, highly recommended.",
                  name: "Jacob Jones",
                  role: "Silver Member",
                },
                {
                  title: "Amazing Ambiance!",
                  text: "FitSync is my fitness haven. Motivating atmosphere, skilled trainers, and a sense of community make each session enjoyable and rewarding. Highly recommended for transformative experiences.",
                  name: "Jenny Wilson",
                  role: "Diamond Member",
                },
              ].map((testimonial, index) => (
                <motion.div
                  ref={ref}
                  key={index}
                  className="flex flex-col rounded-xl border border-blue-600 text-center shadow-xl shadow-blue-200"
                  variants={cardVariants}
                >
                  <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                    <span className="absolute -left-5 -top-6 rounded-full border border-blue-600 bg-white p-3 text-5xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="border-blue-500 px-10 text-xl font-black">
                        {testimonial.title}
                      </p>
                      <blockquote className="mt-8 flex-1">
                        <p className="leading-relaxed text-blue-900">
                          {testimonial.text}
                        </p>
                      </blockquote>
                    </div>
                    <div className="-mx-5 mt-8 px-8 py-1">
                      <div className="">
                        <p className="text-base font-bold">
                          {testimonial.name}
                        </p>
                        <p className="mt-0.5 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Testimonial;
