import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Banner.css";

function Banner() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      interval={5000}
    >
      <div>
        <img loading="lazy" src="https://static.zara.net/photos///contents/mkt/spots/ss23-sale/subhome-xmedia-launch-man-north-south//SVG-landscape-fill-e4e8a93a-83ec-4b8a-a3f6-f2c83d527c13-en_GB@IN.svg?ts=1688934325804" alt="" />
      </div>

      <div>
        <img loading="lazy" src="https://static.zara.net/photos///contents/mkt/spots/ss23-beauty-join-life/subhome-xmedia-28//w/1920/IMAGE-landscape-fill-551cccca-2dcd-4607-8d7b-049c3f21f110-default_0.jpg?ts=1688986965613 " alt="" />
      </div>

      <div>
        <img loading="lazy" src="/wallhaven-gjpm1q_1920x1080.png" alt="" />
      </div>
    </Carousel>
  );
}

export default Banner;
