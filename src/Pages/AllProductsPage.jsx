import { CircularProgress, Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
import { UserContext } from "../App";
import ProductsContext from "../components/ProductsContext";

const AllProductsPage = () => {
  const allProducts = useContext(ProductsContext);
  const user = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [userWishlist, setUserWishlist] = useState([]);

  const fetchUserWishlist = useCallback(async () => {
    if (!user || !user.uid) return [];

    const wishlistRef = collection(db, "user_cart_data", user.uid, "wishlist");
    const querySnapshot = await getDocs(wishlistRef);
    const wishlistItems = [];
    querySnapshot.forEach((doc) => {
      wishlistItems.push(doc.id);
    });
    setUserWishlist(wishlistItems);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      fetchUserWishlist();
    }
  }, [user, fetchUserWishlist]);

  const displayedProducts = searchQuery
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;

  if (!displayedProducts.length) {
    return <CircularProgress />;
  }

  return (
    <Grid item container spacing={3} width="100%">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          initialInWishlist={userWishlist.includes(product.id)}
        />
      ))}
    </Grid>
  );
};

export default AllProductsPage;
