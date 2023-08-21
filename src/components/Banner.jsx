import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Carousel } from "react-responsive-carousel";
import shopMenImage from "../assets/ShopMen.png"
import shopWomenImage from "../assets/ShopWomen.png"
import shopSweatersImage from "../assets/ShopSweaters.png"
import { Link } from 'react-router-dom';

function Banner() {

  const [hoverIndex, setHoverIndex] = useState(null);

  const imageContainerStyle = {
    position: 'relative',
    // border: '2px solid #000'
  };

  const imageTextStyle = {
    position: 'absolute',
    bottom: '60%',
    left: '65%',
    transform: 'translateX(-50%)',
    color: 'black',
    borderRadius: '10px',
    padding: '10px',
    textDecoration: 'none',
    fontSize: '300%',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    transition: '0.2s',
  };

  const imageTextHoverStyle = {
    
    backgroundColor: 'rgba(10, 10, 0, 0.1)'
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };
  const customArrowStyle = {
    backgroundColor: 'rgba(0,0,0,0.5)', // You can customize this as per your needs
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer',
    zIndex: 2
  };

  const arrowPrev = (onClickHandler, hasPrev) => {
    if(!hasPrev) return null; // Don't render if there's no previous slide
    return (
      <div 
        style={{ ...customArrowStyle, position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
        onClick={onClickHandler}
      >
        <NavigateBeforeIcon />
      </div>
    );
  }

  const arrowNext = (onClickHandler, hasNext) => {
    if(!hasNext) return null; // Don't render if there's no next slide
    return (
      <div 
        style={{ ...customArrowStyle, position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        onClick={onClickHandler}
      >
        <NavigateNextIcon />
      </div>
    );
  }

  
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      interval={4000}
      width= "100%"
      showArrows={false}
      renderArrowPrev={arrowPrev} 
      renderArrowNext={arrowNext}
    >
      <div style={imageContainerStyle}>
        <img loading="lazy" src={shopMenImage} alt="Shop Men" />
        <Link 
          to="/allProducts?gender=Men&category="
          style={hoverIndex === 0 ? {...imageTextStyle, ...imageTextHoverStyle} : imageTextStyle}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          Shop Men
        </Link>
      </div>

      <div style={imageContainerStyle}>
        <img loading="lazy" src={shopWomenImage} alt="Shop Women" />
        <Link 
          to="/allProducts?gender=Women&category="
          style={hoverIndex === 1 ? {...imageTextStyle, ...imageTextHoverStyle} : imageTextStyle}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          Shop Women
        </Link>
      </div>

      <div style={imageContainerStyle}>
        <img loading="lazy" src={shopSweatersImage} alt="Shop Sweaters" />
        <Link 
          to="/allProducts?gender=&category=Sweaters"
          style={hoverIndex === 2 ? {...imageTextStyle, ...imageTextHoverStyle} : imageTextStyle}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          Shop Sweaters
        </Link>
      </div>
    </Carousel>
  );
}

export default Banner;
