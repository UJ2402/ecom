import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart, removeItemFromCart, selectCartItems } from "./CartSlice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { all_products } from "../../assets/products.json";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { db } from "../../Firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const items = useSelector(selectCartItems);
  const user = useContext(UserContext);
  console.log(user);

  // const dispatch = useDispatch();

  // const handleDeleteItem = (itemId) => {
  //   dispatch(removeItemFromCart(itemId));
  // };

  useEffect(() => {
    const docRef = doc(db, "user_cart_data", user?.uid);
    const getUser = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUser();
  }, [user]);

  return (
    <Grid container item justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2">Cart</Typography>
      </Grid>

      <Grid item xs={8}>
        {items.map((p) => {
          const productInfo = all_products[p.id];
          return (
            <Card
              key={p.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <CardMedia
                component="img"
                image={productInfo.image}
                sx={{ width: "200px", height: "auto" }}
              />
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="body2">{p.size}</Typography>
                <Typography variant="h4">{productInfo.name}</Typography>
                <Typography variant="h6">Quantity: {p.count}</Typography>
              </CardContent>
              {/* <IconButton onClick={handleDeleteItem(p.id)}>
                <DeleteIcon />
              </IconButton> */}
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Cart;
