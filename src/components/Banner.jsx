import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Banner.css";

function Banner() {
  return (
    <div className="relative">
      <div className="carousel-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={5000}
          className="carousel"
        >
          <div className="slide">
            <img loading="lazy" src="/wallhaven-2ero7g_1920x1080.png" alt="" />
          </div>

          <div className="slide">
            <img loading="lazy" src="/wallhaven-83d19j_1920x1080.png" alt="" />
          </div>

          <div className="slide">
            <img loading="lazy" src="/wallhaven-gjpm1q_1920x1080.png" alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Banner;
