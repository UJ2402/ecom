import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { additemtocart } from "../components/cart/CartSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "../App";
import { useContext } from "react";
import {doc, getDoc} from "firebase/firestore";
import { db } from "../Firebase";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", params.productId);
      const productDoc = await getDoc(productRef);

      if(productDoc.exists()) {
        setProductInfo({ id: productDoc.id, ...productDoc.data() });
      }
      else {
        console.log("No such product!");
      }
    };
    fetchProduct();
  }, [params.productId]);

  const [quantity, setQuantity] = useState(1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  

  const user = useContext(UserContext);

  const handleAddToCart = () => {
    if(user) {
      dispatch(
        additemtocart({
          key: `${productInfo.id}_${size}`,
          count: quantity,
        })
      );

    }
    else {
      alert("Please log in to add items to cart.");
      
    }
     
    
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const [size, setSize] = React.useState("M");

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  // console.log(size, quantity);
  return (
    <Grid item my={10} container spacing={2}>
      <Grid item lg={7}>
        <Img
          sx={{ borderRadius: 5 }}
          src={productInfo.image}
          alt={productInfo.name}
        />
      </Grid>

      <Grid item md={5} lg={5}>
        <Typography variant="h2">{productInfo.name}</Typography>
        <Typography my={3} variant="h5">
          {productInfo.description}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} my={2}>
        ₹{productInfo.price}
        </Typography>
        <Grid container columnSpacing={1}>
          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={size}
                label="Size"
                onChange={handleChange}
              >
                <MenuItem value={"S"}>Small</MenuItem>
                <MenuItem value={"M"}>Medium</MenuItem>
                <MenuItem value={"L"}>Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container md={4}>
            <Grid item container sx={{ p: 1, border: 1, borderRadius: 1 }}>
              <Grid item>
                <IconButton onClick={handleDecrease}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid sx={{ m: 1 }}>
                <Typography variant="body1">{quantity}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleIncrease}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={handleAddToCart}
            
          >
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;