import About from "../../Components/About/About";
import Blog from "../../Components/Blog/Blog";
import Features from "../../Components/Features/Features";
import Testimonial from "../../Components/Testimonial/Testimonial";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <About />
      <Testimonial />
      <Blog />
    </div>
  );
};

export default Home;
