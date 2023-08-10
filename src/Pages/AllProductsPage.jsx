import { CircularProgress, Grid } from "@mui/material";
// import ProductGrid from "../components/ProductGrid"
import { useCallback, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
import { UserContext } from "../App";
const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const user = useContext(UserContext);

  const fetchUserWishlist = useCallback(async () => {
    if (!user || !user.uid) return [];

    const wishlistRef = collection(db, "user_cart_data", user.uid, "wishlist");
    const querySnapshot = await getDocs(wishlistRef);
    const wishlistItems = [];
    querySnapshot.forEach((doc) => {
      wishlistItems.push(doc.id);
    });
    return wishlistItems;
  }, [user]);

  useEffect(() => {
    if (!user || !user.uid) return;
    const fetchAllProducts = async () => {
      const userWishlist = await fetchUserWishlist();
      const productsRef = collection(db, "products"); //ref to products
      const productsSnapshot = await getDocs(productsRef); // get snapshot of that query
      const productList = productsSnapshot.docs.map((doc) => ({
        //maps doc of productsSnapshot and creating obj for each doc with doc id and data
        id: doc.id,
        ...doc.data(),
        initialInWishlist: userWishlist.includes(doc.id)
      }));
      setProducts(productList);
      };
    if(user && user.uid){
    fetchAllProducts();
    }
  }, [user, fetchUserWishlist, setProducts]);

  if(!products.length){
    return <CircularProgress/>
  }

  return (
    <Grid item container spacing={3} width="100%">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} initialInWishlist={product.initialInWishlist}/>
      ))}
    </Grid>
  );
};

export default AllProductsPage;
