const Features = () => {
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Take a look at
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Our</span>
            </span>{" "}
            Amazing Features
          </h2>
        </div>
        <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <img
                src="https://i.ibb.co/1bT5Npp/body-building.png"
                className="w-[60%]"
              />
            </div>
            <h6 className="mb-3 text-2xl font-bold leading-5">Body Building</h6>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Sculpt your physique with our dynamic bodybuilding programs. Every
              rep is a stride toward a powerful, transformed you. Join us as we
              redefine fitness, one muscle at a time.
            </p>
          </div>

          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <img src="https://i.ibb.co/zfkmMrJ/arm.png" className="w-[60%]" />
            </div>
            <h6 className="mb-3 text-2xl font-bold leading-5">Musculation</h6>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Embrace masculinity in our exclusive masculation sessions.
              Tailored for physical prowess and confidence, these programs fuse
              strength and mindset. Join us to sculpt not just muscles, but
              resilience.
            </p>
          </div>

          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <img
                src="https://i.ibb.co/HKVsXj8/weight-lifting.png"
                className="w-[60%]"
              />
            </div>
            <h6 className="mb-3 text-2xl font-bold leading-5">
              Weight Lifting
            </h6>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Celebrate strength with our empowering weightlifting sessions.
              From novice to pro, lift, conquer, and redefine limits. Each lift
              is a journey toward unlocking your full potential and embracing
              empowerment.
            </p>
          </div>

          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
              <img
                src="https://i.ibb.co/zVgw6xh/yoga-mat.png"
                className="w-[60%]"
              />
            </div>
            <h6 className="mb-3 text-2xl font-bold leading-5">Classic Yoga</h6>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Discover serenity in our classic yoga classes. Harmonize mind,
              body, and spirit with ancient practices. From grounding poses to
              meditation, find balance, flexibility, and well-being in our
              vibrant yoga community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
