import { useNavigate } from "react-router-dom";
import { Grid, CardMedia, Typography, CardContent, Card } from "@mui/material";
import AddToCartButton from "./AddToCartButton";
export const ProductCard = (product) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
      <Card onClick={() => navigate(`/productPage/${product.id}`)}>
        <CardMedia component="img" image={product.image} alt={product.name} />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6" color="primary">
          ₹{product.price.toFixed(2)}
          </Typography>
          <AddToCartButton />
        </CardContent>
      </Card>
    </Grid>
  );
};
 