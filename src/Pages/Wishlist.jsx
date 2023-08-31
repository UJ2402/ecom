import { useState, useEffect, useContext } from "react";
import { db } from "../Firebase";
import { UserContext } from "../App";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductCard } from "../Components/ProductCard";
import { Grid } from "@mui/material";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const user = useContext(UserContext);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && user.uid) {
        const wishlistRef = collection(
          db,
          "user_cart_data",
          user.uid,
          "wishlist"
        );
        const querySnapshot = await getDocs(wishlistRef);
        const items = [];

        for (const wishlistItem of querySnapshot.docs) {
          const productRef = doc(db, "products", wishlistItem.id);
          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            items.push({ id: productDoc.id, ...productDoc.data() });
          }
        }

        setWishlistItems(items);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>Your Wishlist</h1>
        </Grid>
        {wishlistItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            initialInWishlist={true}
            onRemoveFromWishlist={() => handleRemoveFromWishlist(product.id)}
          />
        ))}
      
    </Grid>
  );
};

export default Wishlist;
