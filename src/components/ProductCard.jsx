import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { formatNumberWithCommas } from "../components/utils";
import {
  Grid,
  CardMedia,
  Typography,
  CardContent,
  Card,
  Skeleton,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from "../Firebase";
export const ProductCard = ({ product, initialInWishlist = false  }) => {
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);

  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
    }).isRequired,
    initialInWishlist: PropTypes.bool,
  };

  const user = useContext(UserContext);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user && user.id) {
        const inWishlist = await isProductInWishlist(user.id, product.id);
        setIsInWishlist(inWishlist);
      }
    };
    checkWishlistStatus();
  }, [product, user]);

  const handleWishlistToggle = async (event) => {
    event.stopPropagation();
    setIsInWishlist(prevState => !prevState);
    try{
    if (user && user.uid) {
      if (isInWishlist) {
        await removeFromWishlist(user.uid, product.id);
        setIsInWishlist(false);
      } else {
        await addToWishlist(user.uid, product);
        setIsInWishlist(true);
      }
    } else {
      console.log(user, user.uid);
      alert("login karlo");
    }
  } catch (error) {
    console.log(error);
    setIsInWishlist(prevState => !prevState);
    }
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
      <Card
        style={{ height: "100%", marginTop: "30px" }}
        onClick={() => navigate(`/productPage/${product.id}`)}
      >
        {!imgLoaded && (
          <Skeleton variant="rectangular" width="100%" height="79%" />
        )}
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              height: "59px",
              lineClamp: 2,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" color="primary">
              ₹ {formatNumberWithCommas(product.price)}
            </Typography>
            <IconButton onClick={handleWishlistToggle}>
              {isInWishlist ? (
                <FavoriteIcon sx={{color: "#FF0000"}} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
