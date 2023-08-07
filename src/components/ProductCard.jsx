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
} from "@mui/material";
import { useState } from "react";
export const ProductCard = ({ product }) => {
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

          <Typography variant="h6" color="primary">
            ₹ {formatNumberWithCommas(product.price)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

