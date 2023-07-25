import { Button, Grid } from "@mui/material";
import { app, auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useContext } from "react";
import styled from "styled-components";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../App";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const LoginPage = () => {
  const user = useContext(UserContext);
  // console.log(user);
  const signOut = useCallback(() => {
    auth.signOut();
  }, []);
  const signInWithGoogle = useCallback(() => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {});
  }, []);

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
