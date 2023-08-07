import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import {  auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useContext } from "react";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../App";
import { db } from "../Firebase";
import updateCartFromFirestore from "../components/cart/CartSlice";

const LoginPage = () => {
  const user = useContext(UserContext);
  // console.log(user);
  // const signOut = useCallback(() => {
  //   auth.signOut();
  // }, []);
  const signInWithGoogle = useCallback(() => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(() => {});
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          // Fetch cart data from Firestore based on the user's ID
          const docRef = db.collection("users").doc(user.uid);
          const docSnap = await docRef.get();

          if (docSnap.exists()) {
            const cartData = docSnap.data().cart;
            // Update the cart state in Redux store with the fetched cart data
            updateCartFromFirestore(cartData);
          }
        } catch (error) {
          console.error("Error fetching cart data from Firestore:", error);
        }
      }
    };

    fetchCartData();
  }, [user]);

  return (
    <Grid item>
      {user ? (
        <div>
          <ProfilePage />
        </div>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
      )}
    </Grid>
  );
};

export default LoginPage;
