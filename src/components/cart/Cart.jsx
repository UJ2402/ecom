import { useSelector } from "react-redux";
import { selectCartItems } from "./CartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { all_products } from "../../assets/products.json";

const Cart = () => {
  const items = useSelector(selectCartItems);
  

  return (
    <Grid container item>
      <Grid item xs={12}>
        <Typography variant="h2">Cart</Typography>
      </Grid>
      <Grid item xs={8}>
        {items.map((p) => {
          const productInfo = all_products[p.id];
          return (
            <Card key={p.id}>
              <CardMedia
                component="img"
                image={productInfo.image}
                sx={{ maxWidth: "200px" }}
              />
              <CardContent>
              <Typography variant="2">{p.size}</Typography>
            
                <Typography variant="h4">{productInfo.name}</Typography>
                <Typography variant="h6">{p.count}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Cart;
