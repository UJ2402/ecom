import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { all_products } from "../assets/products.json";
import { ProductCard } from "./ProductCard";
import ProductPage from "./ProductPage";

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent="space-between"
      marginX={12}
      sx={{ cursor: "pointer" }}
    >
      {[all_products.map((product) => ProductCard(product))]}
      {/* {all_products.map((product) => (
        <div key={product.id} onClick={() =>handleCardClick(product)}>
          <ProductCard product={product} />
        </div>
      ))}
      {selectedProduct && <ProductPage product={selectedProduct} />} */}
    </Grid>
  );
};

export default ProductGrid;
