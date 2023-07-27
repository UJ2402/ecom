import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { calculateCartTotal, clearCart, removeItemFromCart, selectCartItems } from "./CartSlice";
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

 const cartTotal = calculateCartTotal(items, all_products);

 const fullName = user?.displayName;
  const firstName = fullName ? fullName.split(" ")[0] : null;

  const dispatch = useDispatch();

  const handleDeleteItem = (key) => {
    dispatch(removeItemFromCart(key));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  // useEffect(() => {
  //   const docRef = doc(db, "user_cart_data", user?.uid);
  //   const getUser = async () => {
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   };
  //   getUser();
  // }, [user]);

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        {user ? (<Typography variant="h3">{firstName}'s Cart 🛒</Typography>) : (<Typography variant="h3">Sign up to add items.</Typography>) }
        
      </Grid>

      {user? (<Grid item xs={8}>
        {Object.keys(items).map((key) => {
          const count = items[key];
          const [id, size] = key.split("_");
          const productInfo = all_products[id];

          return count > 0 ? (
            <Card
              key={key}
              sx={{
                display: "flex",
                mb: 4,
                borderRadius: 5,
                marginLeft:1
              }}
            >
              <CardMedia
                component="img"
                image={productInfo.image}
                sx={{ width: "200px", height: "auto" }}
              />
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h3">{productInfo.name}</Typography>
                <Typography variant="h6">{productInfo.description}</Typography>
                <Grid container direction="row" justifyContent="space-between">
                  <Typography variant="body2">Size: {size}</Typography>
                  <Typography variant="h6">Quantity: {count}</Typography>
                </Grid>
                <Typography variant="h6">
                  Price: ₹{productInfo.price}
                </Typography>
                <Typography mt={12} variant="h6">
                  Total Price: ₹{productInfo.price * count}
                </Typography>
              </CardContent>
              <IconButton
                sx={{ mt: 34 }}
                onClick={() => {
                  handleDeleteItem(key);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ) : (
            <></>
          );
        })}
      </Grid>) : (null)}

      
      <Grid item xs={4}>
        {user ? ( <Card sx={{ p: 2, marginRight:5, borderRadius:5 }}>
          <Typography variant="h5">Cart Summary</Typography>
          <Typography variant="h6">Total Cart Price: ₹{cartTotal.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" onClick={handleClearCart} >
            Empty Cart
          </Button>
        </Card>) : (null) }
       
      </Grid>
    </Grid>
  );
};

export default Cart;
