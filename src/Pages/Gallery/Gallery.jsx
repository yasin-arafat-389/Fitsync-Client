import PageTitle from "../../Components/PageTitle/PageTitle";
import img1 from "../../Assets/1.jpg";
import img2 from "../../Assets/2.jpg";
import img3 from "../../Assets/3.jpg";
import img4 from "../../Assets/4.jpg";
import img5 from "../../Assets/5.jpg";
import img6 from "../../Assets/6.jpg";
import img7 from "../../Assets/7.jpg";
import img8 from "../../Assets/8.jpg";
import img9 from "../../Assets/9.jpg";
import img10 from "../../Assets/10.jpg";
import img11 from "../../Assets/11.jpg";
import img12 from "../../Assets/12.jpg";
import img13 from "../../Assets/13.jpg";
import img14 from "../../Assets/14.jpg";
import img15 from "../../Assets/15.jpg";
import img16 from "../../Assets/16.jpg";
import img17 from "../../Assets/17.jpg";
import img18 from "../../Assets/18.jpg";

import AOS from "aos";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const Gallery = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease",
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>FitSync | Gallery</title>
      </Helmet>

      <PageTitle title="Gallery" />

      <div className="w-[80%] mx-auto my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <img
              className="h-auto max-w-full object-cover rounded-lg"
              src={img1}
              alt=""
            />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img2} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img3} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img4} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img5} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img6} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img7} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img8} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img9} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img10} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img11} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src={img12} alt="" />
          </div>

          {/* Loading image animate */}
          <div data-aos="fade-up">
            <img className="h-auto max-w-full rounded-lg" src={img13} alt="" />
          </div>

          <div data-aos="fade-down">
            <img className="h-auto max-w-full rounded-lg" src={img14} alt="" />
          </div>

          <div data-aos="fade-up">
            <img className="h-auto max-w-full rounded-lg" src={img15} alt="" />
          </div>

          <div data-aos="fade-down">
            <img className="h-auto max-w-full rounded-lg" src={img16} alt="" />
          </div>

          <div data-aos="fade-up">
            <img className="h-auto max-w-full rounded-lg" src={img17} alt="" />
          </div>

          <div data-aos="fade-down">
            <img className="h-auto max-w-full rounded-lg" src={img18} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
