import {
  Grid,
} from "@mui/material";
import { all_products } from "../assets/products.json";
import { ProductCard } from "./ProductCard";

const ProductGrid = () => {
  return (
    <Grid
      item
      container
      spacing={3}
      width="100%"
      justifyContent="space-between"
      
      sx={{ cursor: "pointer" }}
    >
      {[Object.keys(all_products).map((id) => ProductCard(all_products[id]))]}
    </Grid>
  );
};

export default ProductGrid;
