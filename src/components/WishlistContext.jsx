import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,  // <-- Import useCallback
} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { UserContext } from "../App";
import PropTypes from "prop-types";

const WishlistContext = createContext({
  userWishlist: [],
  isLoading: true,
  refreshWishlist: () => {},
});

const WishlistProvider = ({ children }) => {
  const [userWishlist, setUserWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);

  // Using useCallback to ensure this function is stable and won't cause rerenders
  const fetchUserWishlist = useCallback(async () => {
    setIsLoading(true);
    if (!user || !user.uid) {
      setIsLoading(false);
      return;
    }

    try {
      const wishlistRef = collection(db, "user_cart_data", user.uid, "wishlist");
      const querySnapshot = await getDocs(wishlistRef);
      const wishlistItems = [];
      querySnapshot.forEach((doc) => {
        wishlistItems.push(doc.id);
      });
      setUserWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);  // <-- user dependency for useCallback

  const refreshWishlist = async () => {
    fetchUserWishlist();
  };

  useEffect(() => {
    fetchUserWishlist();
  }, [fetchUserWishlist]);  // <-- Add fetchUserWishlist as a dependency

  return (
    <WishlistContext.Provider
      value={{ userWishlist, isLoading, refreshWishlist }}  // <-- Include refreshWishlist here
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WishlistContext, WishlistProvider };
