import { useSelector, useDispatch } from "react-redux";
import {
  calculateCartTotal,
  clearCart,
  removeItemFromCart,
  selectCartItems,
} from "./CartSlice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { formatNumberWithCommas } from "./../utils";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateCartInFirestore } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

const Cart = () => {
  const items = useSelector(selectCartItems);
  const user = useContext(UserContext);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      for (let key of Object.keys(items)) {
        const [id] = key.split("_");
        const productRef = doc(db, "products", id);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProducts((prevProducts) => ({
            ...prevProducts,
            [id]: productDoc.data(),
          }));
        }
      }
    };
    fetchProducts();
  }, [items]);

  const cartTotal = calculateCartTotal(items, products);

  useEffect(() => {
    const updateCartItems = async () => {
      if (user) {
        try {
          await updateCartInFirestore(user.uid, items);
        } catch (error) {
          console.log("Error updating cart items in Firestore", error);
        }
      }
    };

    updateCartItems();
  }, [items, user]);

  const fullName = user?.displayName;
  const firstName = fullName ? fullName.split(" ")[0] : null;

  const dispatch = useDispatch();

  const handleDeleteItem = (key) => {
    dispatch(removeItemFromCart(key));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        {user ? (
          <Typography variant="h3">{`${firstName}'s Cart 🛒`}</Typography>
        ) : (
          <Typography variant="h3">Sign up to add items.</Typography>
        )}
      </Grid>

      {user ? (
        <Grid item xs={8}>
          {Object.keys(items).map((key) => {
            const count = items[key];
            const [id, size] = key.split("_");
            const productInfo = products[id];

            return count > 0 && productInfo ? (
              <Card
                key={key}
                sx={{
                  display: "flex",
                  mb: 4,
                  borderRadius: 5,
                  marginLeft: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={productInfo.image}
                  sx={{ width: "200px", height: "auto" }}
                />
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h3">{productInfo.name}</Typography>
                  <Typography variant="h6">
                    {productInfo.description}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2">Size: {size}</Typography>
                    <Typography variant="h6">Quantity: {count}</Typography>
                  </Grid>
                  <Typography variant="h6">
                    Price: ₹{formatNumberWithCommas(productInfo.price)}
                  </Typography>
                  <Typography mt={12} variant="h6">
                    Total Price: ₹{formatNumberWithCommas(productInfo.price * count)}
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
              <React.Fragment key={key}></React.Fragment>
            );
          })}
        </Grid>
      ) : null}

      <Grid item xs={4}>
        {user ? (
          <Card sx={{ p: 2, marginRight: 5, borderRadius: 5 }}>
            <Typography variant="h5">Cart Summary</Typography>
            <Typography variant="h6">
              Total Cart Price: ₹{formatNumberWithCommas(cartTotal)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearCart}
            >
              Empty Cart
            </Button>
          </Card>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Cart;
