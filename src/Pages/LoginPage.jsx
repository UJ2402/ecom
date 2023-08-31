import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useContext } from "react";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../App";
import { db } from "../Firebase";
import updateCartFromFirestore from "../Components/Cart/CartSlice";


const LoginPage = () => {
  const user = useContext(UserContext);

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
    <Grid container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {user ? (
        <ProfilePage />
      ) : (
        <Button 
          sx={{ 
            backgroundColor: '#000000', 
            color: 'white', 
            padding: 2,
            marginTop: '10vh',
            '&:hover': {
              backgroundColor: '#8BC292',
              color: '#000000'
            },
            '& .MuiButton-startIcon': {
              marginRight: 1,
            }
          }} 
          startIcon={<GoogleIcon />} 
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      )}
    </Grid>
  );
};

export default LoginPage;
