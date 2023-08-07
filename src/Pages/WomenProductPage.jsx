import { Grid,   } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
const WomenProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      const productsRef = collection(db, "products"); //ref to products
      const womenQuery = query(productsRef, where("gender", "==", "Women")); //query to get gender == men
      const productsSnapshot = await getDocs(womenQuery); // get snapshot of that query
      const productList = productsSnapshot.docs.map((doc) => ({
        //maps doc of productsSnapshot and creating obj for each doc with doc id and data
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      console.log(products);
    };
    fetchWomenProducts();
  }, []);

  return (
    <Grid
      item
      container
      spacing={4}
      width="100%"
      sx={{ cursor: "pointer" }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default WomenProductPage;