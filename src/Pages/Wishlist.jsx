import { useState, useEffect, useContext } from "react";
import { db } from "../Firebase";
import { UserContext } from "../App";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductCard } from "../components/ProductCard"; 
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
  return (
    <Grid container>
      <Grid item>
        <h1>Your Wishlist</h1>
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} initialInWishlist={true}/>
        ))}
      </Grid>
    </Grid>
  );
};

export default Wishlist;
