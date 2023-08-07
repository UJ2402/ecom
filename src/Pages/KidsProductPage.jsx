import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
const KidsProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchKidsProducts = async () => {
      const productsRef = collection(db, "products"); //ref to products
      const kidsQuery = query(productsRef, where("gender", "==", "Kids")); //query to get gender == kids
      const productsSnapshot = await getDocs(kidsQuery); // get snapshot of that query
      const productList = productsSnapshot.docs.map((doc) => ({
        //maps doc of productsSnapshot and creating obj for each doc with doc id and data
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      console.log(products);
    };
    fetchKidsProducts();
  }, []);

  return (
    <Grid item container spacing={4} width="100%" sx={{ cursor: "pointer" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default KidsProductPage;
