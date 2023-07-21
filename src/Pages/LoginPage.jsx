import { Button, Grid } from "@mui/material";
import { app, auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import styled from "styled-components";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const LoginPage = () => {
  const [user, setUser] = useState();
  console.log(user);
  const signOut = useCallback(() => {
    auth.signOut();
  }, []);
  const signInWithGoogle = useCallback(() => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      setUser(res);
    });
  }, [setUser]);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  return (
    <Grid item>
      {user ? (
        <div>
          <h1>{user.displayName}</h1>
          <Img src={user?.photoURL}></Img>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
      )}
    </Grid>
  );
};

export default LoginPage;
