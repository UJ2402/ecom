import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ProductCard } from './ProductCard'; // Import the ProductCard component
import { WishlistContext } from './WishlistContext';

const BestSeller = ({ allProducts }) => {
    const {userWishlist} = useContext(WishlistContext);

  const [ setScrollPosition] = React.useState(0);

  const scrollAmount = 300; // Adjust this value according to your needs
  
  // Fetch 12 random products
  const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 12);

  const scrollContainerRef = React.useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollAmount
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <IconButton
        style={{ position: 'absolute', left: 0,  top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleScrollLeft}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Grid container spacing={3} wrap="nowrap" ref={scrollContainerRef} style={{ overflowX: 'auto', gap: '16px', whiteSpace: 'wrap' }}>
        {randomProducts.map(product => (
          <ProductCard key={product.id} product={product}
          initialInWishlist={userWishlist.includes(product.id)} />
        ))}
      </Grid>
      <IconButton
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleScrollRight}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

BestSeller.propTypes = {  
    allProducts: PropTypes.arrayOf(PropTypes.object).isRequired
  };
export default BestSeller;
