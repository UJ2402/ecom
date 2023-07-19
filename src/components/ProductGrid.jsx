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
  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent="space-between"
      marginX={12}
      sx={{ cursor: "pointer" }}
    >
      {[Object.keys(all_products).map((id) => ProductCard(all_products[id]))]}
    </Grid>
  );
};

export default ProductGrid;
