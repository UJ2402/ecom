import { Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase"; 
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fullName = user?.displayName;
  const firstName = fullName ? fullName.split(" ")[0] : null;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
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
        <Typography variant="h6">Your wishlist</Typography>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
