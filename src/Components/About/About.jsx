import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const About = () => {
  return (
    <div>
      <section className="overflow-hidden bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Get to know
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  About The FitSync
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Where we promote Fitness Beyond Boundaries
                </p>

                <div className="mt-10">
                  <div className="relative flex gap-5">
                    <IoMdCheckmarkCircleOutline
                      fontSize={"50"}
                      className="text-green-500"
                    />
                    <dd className="inline">
                      Dedicated to inspiring and guiding your fitness journey,
                      we are passionate advocates committed to your health and
                      well-being.
                    </dd>
                  </div>

                  <div className="relative flex gap-5 mt-5">
                    <IoMdCheckmarkCircleOutline
                      fontSize={"50"}
                      className="text-green-500"
                    />
                    <dd className="inline">
                      Dedicated to inspiring and guiding your fitness journey,
                      we are passionate advocates committed to your health and
                      well-being.
                    </dd>
                  </div>

                  <div className="relative flex gap-5 mt-5">
                    <IoMdCheckmarkCircleOutline
                      fontSize={"50"}
                      className="text-green-500"
                    />
                    <dd className="inline">
                      Join a supportive fitness community that fosters
                      motivation and camaraderie. At FitSync, we believe in the
                      power of unity.
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://i.ibb.co/6PyjMVP/pexels-anush-gorak-1229356.jpg"
              className=" rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width="2432"
              height="1442"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
