import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { formatNumberWithCommas } from "./utils";
import {
  Grid,
  CardMedia,
  Typography,
  CardContent,
  Card,
  Skeleton,
  IconButton,
  Snackbar,
  Alert,
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
import { useTheme } from "@emotion/react";
// import { WishlistContext } from "./WishlistContext";

export const ProductCard = ({ product, initialInWishlist = false }) => {
  // const { refreshWishlist } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();

  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      images: PropTypes.arrayOf(PropTypes.string),
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
  }, [product.id, user]);

  const imageSrc =
    product && product.images && product.images.length ? product.images[0] : "";

  const handleWishlistToggle = async (event) => {
    event.stopPropagation();
    setIsInWishlist((prevState) => !prevState);
    try {
      if (user && user.uid) {
        if (isInWishlist) {
          await removeFromWishlist(user.uid, product.id);
          setIsInWishlist(false);
          setSnackbarMessage("Removed from wishlist");
        } else {
          await addToWishlist(user.uid, product);
          setIsInWishlist(true);
          setSnackbarMessage("Added to wishlist");
        }
        setSnackbarOpen(true);
        // refreshWishlist();
      } else {
        console.log(user, user.uid);
        alert("login karlo");
      }
    } catch (error) {
      console.log(error);
      setIsInWishlist((prevState) => !prevState);
      setSnackbarOpen(true);
    }
  };
  return (
    <Grid item xs={12} sm={4} md={2} lg={2} key={product.id}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Card
        style={{ height: "94%", marginTop: "30px" }}
        onClick={() => navigate(`/productPage/${product.id}`)}
      >
        {!imgLoaded && (
          <Skeleton variant="rectangular" width="100%" height="79%" />
        )}
        <CardMedia
          component="img"
          image={imageSrc}
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
              lineHeight: "1.3",
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
                <FavoriteIcon sx={{ color: "#FF0000" }} />
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
