import NavBar from "./components/NavBar";
import { createContext, useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import { Grid } from "@mui/material";
import ProductPage from "./Pages/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";
import HomePage from "./Pages/HomePage";
import { auth } from "./Firebase";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch } from "react-redux";
import { setUserCart } from "./components/cart/CartSlice";
import { getCart } from "./Firebase";
import Footer from "./components/Footer";
import AdminPage from "./Pages/AdminPage";
import MenProductPage from "./Pages/MenProductPage";
import WomenProductPage from "./Pages/WomenProductPage";
import KidsProductPage from "./Pages/KidsProductPage"

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const cartDoc = await getCart(user.uid);
        if (cartDoc.exists()) {
          const cartData = cartDoc.data().cart;
          dispatch(setUserCart(cartData));
        } else {
          dispatch(setUserCart({}));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div
          style={{
            width: "100vw",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ width: "100" }}
          >
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="/productPage/:productId"
                element={<ProductPage />}
              ></Route>
              <Route path="/loginPage" element={<LoginPage />}></Route>
              <Route path="/allProducts" element={<ProductGrid />}></Route>
              <Route path="/profilePage" element={<ProfilePage />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/adminPage" element={<AdminPage />}></Route>
              <Route path="/men" element={<MenProductPage />}></Route>
              <Route path="/women" element={<WomenProductPage />}></Route>
              <Route path="/kids" element={<KidsProductPage />}></Route>




            </Routes>
          </Grid>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
