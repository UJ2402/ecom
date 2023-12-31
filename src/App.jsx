import NavBar from "./Components/NavBar";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import ProductGrid from "./components/ProductGrid";
import { Grid } from "@mui/material";
import ProductPage from "./Pages/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import HomePage from "./Pages/HomePage";
import { auth } from "./Firebase";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch } from "react-redux";
import { setUserCart } from "./Components/Cart/CartSlice";
import { getCart } from "./Firebase";
import Footer from "./Components/Footer";
import AdminPage from "./Pages/AdminPage";
import MenProductPage from "./Pages/AllProductsPage";
import UpdatePricesPage from "./Components/UpdatePricesPage";
import Wishlist from "./Pages/Wishlist";
// import MigrateImageField from "./components/MigrateImageField";
import { ProductsProvider } from "./Components/ProductsContext.jsx";
import { WishlistProvider } from "./Components/WishlistContext";

export const UserContext = createContext();

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000000", // black
    },
    secondary: {
      main: "#ffffff", // white
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <WishlistProvider>
            <ProductsProvider>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100vh",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  sx={{ width: "100vw" }}
                >
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route
                      path="/productPage/:productId"
                      element={<ProductPage />}
                    ></Route>
                    <Route path="/loginPage" element={<LoginPage />}></Route>
                    {/* <Route path="/allProducts" element={<ProductGrid />}></Route> */}
                    <Route
                      path="/profilePage"
                      element={<ProfilePage />}
                    ></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/adminPage" element={<AdminPage />}></Route>
                    {/* <Route path="/migrate-image-field" element={<MigrateImageField />} /> */}
                    <Route
                      path="/allProducts"
                      element={<MenProductPage />}
                    ></Route>
                    <Route
                      path="/admin/update-prices"
                      element={<UpdatePricesPage />}
                    />
                    <Route
                      path="/profilePage/wishlist"
                      element={<Wishlist />}
                    />
                  </Routes>
                </Grid>
                <Footer />
              </div>
            </ProductsProvider>
          </WishlistProvider>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
