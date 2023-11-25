import { Button } from "@material-tailwind/react";
import "./Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      <section className="py-20 w-[95%] mx-auto">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                <span className="font-semibold text-lg text-primary mb-2 block">
                  Our Blogs
                </span>
                <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                >
                  Our Recent Fitness Blogs
                </h2>
                <p className="text-base text-body-color">
                  Delve into the world of nutrition tailored for peak
                  performance and keep yourself updated with our blogs and news.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img
                    src="https://i.ibb.co/8gztSb1/Blog-Headline.webp"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <h3>
                    <h2
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        ellipsis elipse
                        "
                    >
                      Mastering Mindful Workouts: The Path to Fitness Bliss
                    </h2>
                  </h3>
                  <p className="text-base text-body-color elipse ellipsis-desc">
                    Embark on a transformative fitness journey by integrating
                    mindfulness into your workouts. Mindful exercise is more
                    than just physical exertion; {`it's`} a holistic approach
                    that encompasses mental focus and awareness.
                  </p>
                </div>
                <Link to="/blog/details/6561e31ebbd32f12d7715e57">
                  <Button size="sm" className="mt-4 bg-[#0866ff] capitalize">
                    Read Full Blog
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img
                    src="https://i.ibb.co/G94CRh1/Circuit-Training-Singapore.jpg"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <h3>
                    <h2
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        ellipsis elipse
                        "
                    >
                      The Evolution of HIIT: Unleashing the Power of
                      High-Intensity Workouts
                    </h2>
                  </h3>
                  <p className="text-base text-body-color elipse ellipsis-desc">
                    High-Intensity Interval Training (HIIT) has revolutionized
                    the fitness landscape, offering a potent and time-efficient
                    approach to achieving optimal results. Explore the
                    physiological mechanisms that make HIIT a game-changer in
                    fitness.
                  </p>
                </div>
                <Link to="/blog/details/6561e31ebbd32f12d7715e58">
                  <Button size="sm" className="mt-4 bg-[#0866ff] capitalize">
                    Read Full Blog
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img
                    src="https://i.ibb.co/Q9wKRcg/Getty-Images-639014138.webp"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <h3>
                    <h1
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        ellipsis
                        elipse
                        "
                    >
                      Fueling Your Fitness: The Ultimate Guide to Pre and
                      Post-Workout Nutrition
                    </h1>
                  </h3>
                  <p className="text-base text-body-color elipse ellipsis-desc">
                    Optimizing your fitness journey involves not just the
                    intensity of your workouts but also the fuel you provide
                    your body. Delve into the intricacies of pre and
                    post-workout nutrition to enhance performance, support
                    recovery, and maximize your fitness gains.
                  </p>
                </div>
                <Link to="/blog/details/6561e31ebbd32f12d7715e59">
                  <Button size="sm" className="mt-4 bg-[#0866ff] capitalize">
                    Read Full Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
