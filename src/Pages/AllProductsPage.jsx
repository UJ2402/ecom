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
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchUserWishlist = useCallback(async () => {
      if (!user || !user.uid) {
          setIsLoading(false); // Important to set loading to false if there's no user
          return;
      }

      try {
          const wishlistRef = collection(db, "user_cart_data", user.uid, "wishlist");
          const querySnapshot = await getDocs(wishlistRef);
          console.log("Firestore Response:", querySnapshot.docs);
          const wishlistItems = [];
          querySnapshot.forEach((doc) => {
              wishlistItems.push(doc.id);
          });
          setUserWishlist(wishlistItems);
          setIsLoading(false);
      } catch (error) {
          console.error("Error fetching wishlist:", error);
          setIsLoading(false); // Set loading to false even if there's an error to prevent infinite loading
      }
  }, [user]);


    useEffect(() => {
      if (user && user.uid) {
        console.log("Is Loading:", isLoading);
        fetchUserWishlist();
      }
    }, [user, fetchUserWishlist, isLoading]);

    const displayedProducts = searchQuery
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allProducts;

    if (isLoading) {
      return <CircularProgress />;
    }

    if (!displayedProducts.length) {
      return <CircularProgress />;
    }
    console.log("Displayed Products", displayedProducts);
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
