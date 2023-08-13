import NavBar from "./components/NavBar";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import ProductGrid from "./components/ProductGrid";
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
import MenProductPage from "./Pages/AllProductsPage";
import UpdatePricesPage from "./components/UpdatePricesPage";
import Wishlist from "./Pages/Wishlist";
import { ProductsContext } from "./components/ProductsContext.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
// import MigrateImageField from "./components/MigrateImageField";

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
  const [products, setProducts] = useState([]);

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

    const fetchAllProducts = async () => {
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchAllProducts();

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <ProductsContext.Provider value={products}>
          <BrowserRouter>
            <div
              style={{
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ width: "100%" }}
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
                  <Route path="/profilePage" element={<ProfilePage />}></Route>
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
                  <Route path="/profilePage/wishlist" element={<Wishlist />} />
                </Routes>
              </Grid>
              <Footer />
            </div>
          </BrowserRouter>
        </ProductsContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
