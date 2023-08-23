import { clearCartData } from "../Components/Cart/CartSlice";
import { db } from "../Firebase";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const adminDocRef = doc(db, "is_user_admin", user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists() && adminDocSnap.data().isadmin === true) {
          setIsAdmin(true); // Set the admin status
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fullName = user?.displayName;
  const firstName = fullName ? fullName.split(" ")[0] : null;

  const handleSignOut = () => {
    dispatch(clearCartData());
    auth
      .signOut()
      .then(() => {
        localStorage.clear();

        navigate(`/`);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: 100 }}
    >
      <img
        style={{ borderRadius: 22, alignItems: "center" }}
        src={user?.photoURL}
        alt="Profile"
      />
      <Typography variant="h4">Namaste, {firstName}</Typography>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={{ my: 4, textAlign: "center" }}
      >
        <Typography variant="h6">Your email: {user?.email}</Typography>
        <Button onClick={() => navigate("/profilePage/wishlist")}>
          Wishlist
        </Button>
        <Button onClick={handleSignOut}>Sign Out</Button>
        {isAdmin && ( // Conditionally render the Admin Page button
          <Button onClick={() => navigate("/adminPage")}>Admin Page</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
