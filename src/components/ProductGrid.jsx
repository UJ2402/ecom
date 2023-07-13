import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { all_products } from "../assets/products.json";

const ProductGrid = () => {
  //   const [products, setProducts] = useState([...all_products]);

  return (
    <Grid container spacing={2}>
      {[
        all_products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )),
      ]}
    </Grid>
  );
};

export default ProductGrid;
