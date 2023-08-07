import { Grid } from "@mui/material";
// import ProductGrid from "../components/ProductGrid"
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
const MenProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMenProducts = async () => {
      const productsRef = collection(db, "products"); //ref to products
      const menQuery = query(productsRef, where("gender", "==", "Men")); //query to get gender == men
      const productsSnapshot = await getDocs(menQuery); // get snapshot of that query
      const productList = productsSnapshot.docs.map((doc) => ({
        //maps doc of productsSnapshot and creating obj for each doc with doc id and data
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      console.log(products);
    };
    fetchMenProducts();
  }, []);

  return (
    <Grid
      item
      container
      spacing={3}
      width="100%"
      
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default MenProductPage;